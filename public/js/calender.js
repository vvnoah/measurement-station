const vandaag = new Date();
const overEenWeek = new Date();
const eenWeekGeleden = new Date();
overEenWeek.setDate(vandaag.getDate() + 6); // Stel het einde van de week in (7 dagen vanaf vandaag)
eenWeekGeleden.setDate(vandaag.getDate() - 6) // Stel een week gelden in (7 dagen vanaf vandaag)

const defaultDate = vandaag.toLocaleDateString('be-BE'); // Lokale datumformattering
console.log("Standaard datum (vandaag):", defaultDate);
var startDate = "";
var endDate = "";

//EVENTLISTENER VOOR DE CLOSE BUTTON IN DE POPUP
// => reset de date and reload chart.
document.addEventListener("DOMContentLoaded", function () 
{
    const closeButton = document.getElementById('close-popup');
    closeButton.addEventListener('click', () => {
        //console.log('Close button clicked');

        // Format de standaarddatum volgens het opgegeven formaat
        const formattedToday = flatpickr.formatDate(vandaag, "d-m-Y");

        // Reset calendar
        datepicker.clear(); // Verwijder huidige selectie
        datepicker.setDate(defaultDate, true); // Stel de standaarddatum in
        startDate = "";
        endDate = "";

        // Clear bestaande chart
        if (window.myChart) {
            window.myChart.destroy();
            window.myChart = null;
        }
        startDate = "";
        endDate = "";
    });
});

//Initialiseer flatpickr voor een datumreeksselectie
// Datepicker instellingen blijven hetzelfde zoals hierboven
const datepicker = flatpickr("#dateRange", {
    position: "auto",
    static: true,
    mode: "range",
    dateFormat: "d-m-Y",
    allowInput: true,
    defaultDate: [vandaag],
    maxDate: vandaag,
    locale: "nl",
    onChange: function (selectedDates) {
        if (selectedDates.length === 1) 
        {
            startDate = formatDateToLocal(selectedDates[0]);
            endDate = formatDateToLocal(selectedDates[0]);
            fetch_specific_data(startDate, endDate);
        } 
        else if (selectedDates.length === 2) 
        {
            startDate = formatDateToLocal(selectedDates[0]);
            endDate = formatDateToLocal(selectedDates[1]);
            fetch_specific_data(startDate, endDate);
        }
    },
});

//TIJDSINTERVALLEN GENEREREN GRAFIEK
function generateTimeIntervals(startDate, endDate, stepSize = 15, timeUnit = "minute") {
    const intervals = [];
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const stepInMillis = {
        minute: stepSize * 60 * 1000,
        hour: stepSize * 60 * 60 * 1000,
        day: stepSize * 24 * 60 * 60 * 1000,
    }[timeUnit];

    for (let time = start; time <= end; time += stepInMillis) {
        intervals.push(new Date(time).toISOString());
    }

    return intervals;
}

//FETCH DATA VOOR SPECIFIEKE DATUM & SPECIFIEKE SENSOR! (API)
async function fetch_specific_data(startDate, endDate) {
    console.log(`Fetching data from ${startDate} to ${endDate}`);

    const datasets = [];
    const colors = ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"];

    for (const [index, stationId] of selectedStations.entries()) {
        try {
            const response = await fetch(
                `/api/fetch-specific-data?stationId=${stationId.id}&sensors=${globalSensorId}&startDate=${startDate}&endDate=${endDate}`
            );

            if (!response.ok) {
                throw new Error(`Error fetching data for station ${stationId.id}: ${response.statusText}`);
            }

            const rawData = await response.json();
            console.log('rawData:', rawData);
            // LEGE DATA => continue next station
            if (!rawData || rawData.length === 0) {
                console.warn(`No data found for station ${stationId.id}`);
                continue; // Skip 
            }

            const measurements = rawData[0].measurements;

            //LEGE MEASUREMENTS => Skip
            if (!measurements || measurements.length === 0) {
                console.warn(`No measurements found for station ${stationId.id}`);
                continue;
            }

            const reducedData = downsampleMeasurements(measurements, 50); //aantal measurements meegeven voor op chart (INT)
            console.log('reducedData:', reducedData);

            datasets.push({
                label: `Station ${stationId.id}`,
                data: reducedData.map((point) => ({
                    x: new Date(point.timestamp).toISOString(),
                    y: point.sensorValue,
                })), // Align timestamp and value
                borderColor: colors[index % colors.length],
                backgroundColor: colors[index % colors.length].replace("1)", "0.2)"),
                tension: 0.1,
            });
        } catch (error) {
            console.error(`Error fetching data for station ${stationId.id}:`, error);
        }

    }

    const noDataMessage = document.getElementById('no-data-message');
    // Render als data correct
    if (datasets.length > 0) {
        noDataMessage.classList.add('hidden');
        renderChart(datasets, startDate, endDate);
    } else {
        console.log('No data available to render chart');
        
        noDataMessage.classList.remove('hidden');
        if (window.myChart) {
            window.myChart.destroy();
        }
    }
}

// FORMATTEREN DATUM LEESBAAR FORMAAT CODE
function formatDateToLocal(date) 
{
    return date.getFullYear() +
        "-" + String(date.getMonth() + 1).padStart(2, "0") +
        "-" + String(date.getDate()).padStart(2, "0");
}



//MEASUREMENTS DOWNSAMPLEN NAAR GEWENST AANTAL
function downsampleMeasurements(measurements, targetSamples) {
    if (measurements.length <= targetSamples) {
        return measurements; // ALS MINDER DAN TARGETSAMPLES, RETURN ALLE BESCHIKBARE MEASUREMENTS
    }

    measurements.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Sort by timestamp

    const step = Math.floor(measurements.length / targetSamples); 
    const downsampled = [];

    for (let i = 0; i < measurements.length; i += step) {
        downsampled.push(measurements[i]); 
    }

    // Laatste meting toevoegen voor correcte weergave
    const latestMeasurement = measurements[measurements.length - 1];
    if (!downsampled.some((m) => m.timestamp === latestMeasurement.timestamp)) {
        downsampled.push(latestMeasurement);
    }

    return downsampled;
}



//RENDER CHART DETAILSPAGE
function renderChart(datasets, startDate, endDate) {
    const canvas = document.getElementById("details-popup-chart");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 350;

    // VERDELING Y-AS:
    let globalMin = Infinity;
    let globalMax = -Infinity;

    datasets.forEach(dataset => {
        dataset.data.forEach(point => {
            if (point.y < globalMin) globalMin = point.y;
            if (point.y > globalMax) globalMax = point.y;
        });
    });
    //console.log("MIN & MAX GLOBAL", globalMin, globalMax);

    // Als min & max equal => +1 en -1 voor buffer
     if (globalMin === globalMax) {
         globalMin -= 1; 
         globalMax += 1; 
     }

    // const range = globalMax - globalMin;
    // const buffer = range * 0.2; // 20% buffer
    var newMin = (globalMin*1) - (globalMin * 0.4); // 40% buffer
    var newMax = (globalMax*1) + (globalMax * 0.4);

    var m = newMin - globalMin;
    var x = newMax - globalMax;
    var EqualDifference = (m + x)/2;

    //console.log("EQUALDIFFERENCE", EqualDifference);

    const calculatedMinValue = globalMin - EqualDifference; 
    const calculatedMaxValue = (globalMax*1) + EqualDifference; 
    //console.log("MIN & MAX CALCULATED", calculatedMinValue, calculatedMaxValue);


    if (window.myChart) {
        window.myChart.destroy();
        window.myChart = null;
    }

    // VERDELING X-AS:
    const rangeStart = new Date(startDate).getTime();
    const rangeEnd = new Date(endDate).getTime();
    const rangeDuration = rangeEnd - rangeStart;

    let timeUnit, stepSize, tooltipFormat, displayFormats;

    // Range van 2 days of minder: display hours and minutes with the day
    if (rangeDuration <= 2 * 24 * 60 * 60 * 1000) 
    {
        timeUnit = "minute";
        stepSize = 15; //ticks every 15 minutes
        tooltipFormat = "dd-MM-yyyy HH:mm";
        displayFormats = {
            minute: "dd-MM HH:mm", // day, hours, and minutes
            hour: "dd-MM HH:mm",   // For hourly data
        };
    } 
    // Voor range van 7 days of minder: display hours and the day
    else if (rangeDuration <= 7 * 24 * 60 * 60 * 1000) 
    {
        timeUnit = "hour";
        stepSize = 1; //ticks every hour
        tooltipFormat = "dd-MM-yyyy HH:mm";
        displayFormats = {
            hour: "dd-MM HH:mm", // Show day and hours
            day: "dd-MM",        // For fallback
        };
    } 
    // Grote ranges: display only days
    else 
    {
        timeUnit = "day";
        stepSize = 1; // ticks every day
        tooltipFormat = "dd-MM-yyyy";
        displayFormats = {
            day: "dd-MM", // Show only day
            week: "dd-MM-yyyy", // Fallback for very large ranges
        };
    }

    // Generate fallback labels for the X-axis if datasets are empty
    const labels = datasets.length === 0
        ? generateTimeIntervals(startDate, endDate, stepSize, timeUnit) // Generate intervals
        : datasets[0].data.map((point) => point.x);

    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            //VRAGEN AAN KLANT OF GEWENST!
            //pointBackgroundColor: 'rgba(0, 0, 0, 0)', //maakt de punten transparant, maar je kan wel de data nog zien als je met de muis er over beweegt
            //pointBorderColor: 'rgba(0, 0, 0, 0)',
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Sensor Data (${startDate} to ${endDate})`,
                },
            },
            scales: {
                x: {
                    type: "time", // Time scale, punten dynamisch plotten
                    time: {
                        unit: timeUnit, // Adjust dynamically
                        stepSize: stepSize, // Set step size dynamically
                        tooltipFormat: tooltipFormat, // Tooltip format
                        displayFormats: displayFormats, // Dynamic display formats
                    },
                    title: {
                        display: true,
                        text: "Time (Day and Hours)",
                    },
                    // min: new Date(startDate).toISOString(),
                    // max: new Date(endDate).toISOString(),
                    //min: new Date(new Date(startDate).getTime() - 12 * 60 * 60 * 1000), // 12 hours before
                    //max: new Date(new Date(endDate).getTime() + 12 * 60 * 60 * 1000),  // 12 hours after
                    min: new Date(new Date(startDate).getTime() -1*60*60*1000), // 12 hours before
                    max: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000),  // 12 hours after
                },
                y: {
                    title: {
                        display: true,
                        text: "Sensor Value",
                    },
                    min: calculatedMinValue,
                    max: calculatedMaxValue,
                },
            },
        },
    });
}
