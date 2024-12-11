const vandaag = new Date();
const overEenWeek = new Date();
const eenWeekGeleden = new Date();
overEenWeek.setDate(vandaag.getDate() + 6); // Stel het einde van de week in (7 dagen vanaf vandaag)
eenWeekGeleden.setDate(vandaag.getDate() - 6) // Stel een week gelden in (7 dagen vanaf vandaag)

const defaultDate = vandaag.toLocaleDateString('be-BE'); // Lokale datumformattering
console.log("Standaard datum (vandaag):", defaultDate);
var startDate = "";
var endDate = "";

//Initialiseer flatpickr voor een datumreeksselectie
const datepicker = flatpickr("#dateRange", {
    position: "auto", // Zorgt ervoor dat de kalender zich automatisch plaatst
    static: true, // Zorgt ervoor dat de kalender "in de flow" van de pagina blijft
    mode: "range", // Zet modus op 'range' voor begindatum en einddatum
    dateFormat: "d-m-Y",
    allowInput: true,
    defaultDate: [vandaag],
    maxDate: vandaag,
    "locale": "nl",

    onChange: function (selectedDates) {
        // Controleer of er 1 of 2 datums zijn geselecteerd
        if (selectedDates.length === 1) {
            var selectedDate = formatDateToLocal(selectedDates[0]).split('T')[0];
            //startDate =selectedDate;
            //endDate = selectedDate;
            console.log("Geselecteerde datum (enkele datum):", selectedDate);
        } else if (selectedDates.length === 2) {
            startDate = formatDateToLocal(selectedDates[0]).split('T')[0];
            endDate = formatDateToLocal(selectedDates[1]).split('T')[0];
            console.log("Geselecteerd bereik:", startDate, "tot", endDate);

            //getMeasurementsByDate([startDate, endDate]);
            fetch_specific_data(startDate, endDate);
        }
    },
    onOpen: function () {
        // Reset de breedte van het input veld naar 100%
        document.getElementById("dateRange").style.width = "100%";
    }

});

//FETCH DATA VOOR SPECIFIEKE DATUM & SPECIFIEKE SENSOR! (API)
async function fetch_specific_data(startDate, endDate) {
    console.log("Fetching data from " + startDate + " to " + endDate);

    const datasets = []; // To hold datasets for each station
    const colors = ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"]; // Predefined colors

    for (const [index, stationId] of selectedStations.entries()) {
        if (typeof stationId.id !== "string") {
            console.error(`Invalid station ID: ${stationId}. Must be a string.`);
            continue; // Skip invalid entries
        }

        console.log(`Fetching data for station ${stationId.id}...`);
        try {
            const response = await fetch(
                `/api/fetch-specific-data?stationId=${stationId.id}&sensors=${globalSensorId}&startDate=${startDate}&endDate=${endDate}`, {
                    method: "GET"
                }
            );

            if (!response.ok) {
                throw new Error(`Error fetching data for station ${stationId.id}: ${response.statusText}`);
            }

            const rawData = await response.json();
            console.log(`Data for Station ${stationId.id}:`, rawData);

            const measurements = rawData[0].measurements;
            const reducedData = downsampleMeasurements(measurements, 20); // Downsample to 20 points
            console.log("REDUCED DATA", reducedData);

            // Prepare a dataset for the chart
            datasets.push({
                label: `Station ${stationId.id}`, // Label for the station
                data: reducedData.map((point) => point.sensorValue), // Sensor values
                borderColor: colors[index % colors.length], // Assign unique color
                backgroundColor: colors[index % colors.length].replace("1)", "0.2)"), // Transparent background
                tension: 0.1,
            });
        } catch (error) {
            console.error(`Error fetching data for station ${stationId.id}:`, error);
        }
    }

    renderChart(datasets, startDate, endDate); // Pass datasets to renderChart

    const closeButton = document.getElementById('close-popup');
    closeButton.addEventListener('click', () => {

        // Format de standaarddatum volgens het opgegeven formaat
        const formattedToday = flatpickr.formatDate(vandaag, "d-m-Y");

        // Reset de kalender
        datepicker.clear(); // Verwijder huidige selectie
        datepicker.setDate(formattedToday, true); // Stel de standaarddatum in
        startDate = "";
        endDate = "";

        // Clear the datepicker
        //flatpickr("#dateRange").defaultDate = [vandaag];

        // Clear the existing chart
        if (window.myChart) {
            window.myChart.destroy();
        }

        // Reset the startDate and endDate variables
        startDate = "";
        endDate = "";
    });
}


//MEASUREMENTS DOWNSAMPLEN
function downsampleMeasurements(measurements, targetSamples) {
    if (measurements.length <= targetSamples) {
        // If the data already has fewer points than the target, return all points!!!!
        return measurements;
    }

    // Sort the data by timestamp (just in case it isn't sorted)
    measurements.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const step = Math.floor(measurements.length / targetSamples); // Step size to pick samples
    const downsampled = [];

    for (let i = 0; i < measurements.length; i += step) {
        downsampled.push(measurements[i]);
    }

    // Ensure we include the last measurement (if it wasn't included due to step rounding)
    if (measurements.length % step !== 0 && downsampled[downsampled.length - 1] !== measurements[measurements.length - 1]) {
        downsampled.push(measurements[measurements.length - 1]);
    }

    return downsampled;
}


//RENDER CHART
function renderChart(datasets, startDate, endDate) {
    const canvas = document.getElementById("details-popup-chart");
    const ctx = canvas.getContext("2d");

    // Explicitly set fixed size for the canvas
    canvas.width = 800; // Fixed width
    canvas.height = 350; // Fixed height

    // Clear existing chart if needed
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Prepare labels (time axis) based on the first dataset
    const labels = datasets[0] ?
        datasets[0].data.map((_, index) => {
            const timestamp = new Date(startDate);
            timestamp.setMinutes(index * 15); // Example: 15-minute intervals
            return timestamp.toLocaleString();
        }) : [];

    // Create the chart with multiple datasets
    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels, // X-axis time labels
            datasets: datasets, // Pass all datasets for different stations
        },
        options: {
            //pointBackgroundColor: 'rgba(0, 0, 0, 0)', //maakt de punten transparant, maar je kan wel de data nog zien als je met de muis er over beweegt
            //pointBorderColor: 'rgba(0, 0, 0, 0)',
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Sensor Data Comparison (${startDate} to ${endDate})`,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Sensor Value",
                    },
                },
            },
        },
    });
}



function formatDateToLocal(date) {
    // Zet de datum om naar lokale tijd in ISO-achtige notatie (YYYY-MM-DD)
    return date.getFullYear() +
        '-' + String(date.getMonth() + 1).padStart(2, '0') +
        '-' + String(date.getDate()).padStart(2, '0');
}