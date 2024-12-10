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
flatpickr("#dateRange", {
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
            console.log("Geselecteerde datum (enkele datum):", selectedDate);
        } else if (selectedDates.length === 2) {
            startDate = formatDateToLocal(selectedDates[0]).split('T')[0];
            endDate = formatDateToLocal(selectedDates[1]).split('T')[0];
            console.log("Geselecteerd bereik:", startDate, "tot", endDate);

            getMeasurementsByDate([startDate, endDate]);
            fetch_specific_data(startDate, endDate);
        }
    },
    onOpen: function () {
        // Reset de breedte van het input veld naar 100%
        document.getElementById("dateRange").style.width = "100%";
    }
});

async function fetch_specific_data(startDate, endDate) 
{
    console.log("fetching data from " + startDate + " to " + endDate);
    console.log("Selected ID's:",selectedIds);
    console.log("SelectedStations", selectedStations);
    console.log("GLOBAL SENSORID", globalSensorId);

    for (const stationId of selectedStations) {
        console.log("StationIDDDDDD", stationId.id);
        if (typeof stationId.id !== 'string') {
            console.error(`Invalid station ID: ${stationId}. Must be a string.`);
            continue; // Skip invalid entries
        }

        console.log(`Fetching data for station ${stationId.id}...`);
        try {
            const response = await fetch(
                `/api/fetch-specific-data?stationId=${stationId.id}&sensors=${globalSensorId}&startDate=${startDate}&endDate=${endDate}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error(`Error fetching data for station ${stationId.id}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Data for Station ${stationId.id}:`, data);

            // Optionally, process the data further here
        } catch (error) {
            console.error(`Error fetching data for station ${stationId}:`, error);
        }
    }
}

function formatDateToLocal(date) {
    // Zet de datum om naar lokale tijd in ISO-achtige notatie (YYYY-MM-DD)
    return date.getFullYear() +
        '-' + String(date.getMonth() + 1).padStart(2, '0') +
        '-' + String(date.getDate()).padStart(2, '0');
}

// Functie om de mockdata uit een JSON bestand te halen
async function getMockData() {
    try {
        const response = await fetch('js/mockdata.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fout bij het ophalen van mockdata:', error);
        return []; // Retourneer een lege array bij een fout
    }
}

// Functie om gegevens voor een specifieke datum op te halen
function getMeasurementsByDate(selectedDates) {
    getMockData().then(stations => {
        stations.forEach(station => {
            console.log(`Station: ${station.name}, Locatie: ${station.description}`);

            station.sensors.forEach(sensor => {
                const filteredMeasurements = sensor.measurements.filter(measurements => {
                    return selectedDates.some(date => measurements.timestamp.startsWith(date));
                });
                //measurements.timestamp.startsWith(selectedDate)
                //);
                //console.log(filteredMeasurements);
                //console.log("selectedDate:", selectedDate);


                if (filteredMeasurements.length > 0) {
                    console.log(`Sensor (${sensor.type}, ${sensor.unit}):`);
                    filteredMeasurements.forEach(measurement => {
                        console.log(`Tijd: ${measurement.timestamp}, Waarde: ${measurement.sensorValue}`);
                    })
                }
                /*else {
                                   console.log('Geen gegevens voor deze datum.');
                               }*/
            });
        });
    });
}