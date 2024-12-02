const vandaag = new Date();
const overEenWeek = new Date();
const eenWeekGeleden = new Date();
overEenWeek.setDate(vandaag.getDate() + 6); // Stel het einde van de week in (7 dagen vanaf vandaag)
eenWeekGeleden.setDate(vandaag.getDate() - 6) // Stel een week gelden in (7 dagen vanaf vandaag)

const defaultDate = vandaag.toLocaleDateString('be-BE'); // Lokale datumformattering
console.log("Standaard datum (vandaag):", defaultDate);

//Initialiseer flatpickr voor een datumreeksselectie
flatpickr("#dateRange", {
    mode: "range", // Zet modus op 'range' voor begindatum en einddatum
    dateFormat: "d-m-Y",
    allowInput: true,
    defaultDate: [vandaag],
    maxDate: vandaag,

    onChange: function (selectedDates) {
        // Controleer of er 1 of 2 datums zijn geselecteerd
        if (selectedDates.length === 1) {
            var selectedDate = formatDateToLocal(selectedDates[0]).split('T')[0]; // Gebruik lokale datum
            console.log("Geselecteerde datum (enkele datum):", selectedDate);
        } else if (selectedDates.length === 2) {
            const startDate = formatDateToLocal(selectedDates[0]).split('T')[0];
            const endDate = formatDateToLocal(selectedDates[1]).split('T')[0];
            console.log("Geselecteerd bereik:", startDate, "tot", endDate);

            getMeasurementsByDate(selectedDates);
        }
    }
});

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
function getMeasurementsByDate(selectedDate) {
    getMockData().then(stations => {
        stations.forEach(station => {
            console.log(`Station: ${station.name}, Locatie: ${station.description}`);

            station.sensors.forEach(sensor => {
                const filteredMeasurements = sensor.measurements.filter(measurements =>
                    measurements.timestamp.startsWith(selectedDate)
                );
                console.log(filteredMeasurements);
                console.log("selectedDate:", selectedDate);


                if (filteredMeasurements.length > 0) {
                    console.log(`Sensor (${sensors.type}, ${sensors.unit}):`);
                    filteredMeasurements.forEach(measurement => {
                        console.log(`Tijd: ${measurement.timestamp}, Waarde: ${measurement.sensorValue}`);
                    });
                } else {
                    console.log('Geen gegevens voor deze datum.');
                }
            });
        });
    });
}