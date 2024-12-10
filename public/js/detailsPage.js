var globalSensorId ;
//popup open
function popup(sensorId) {
    const popup = document.getElementById("popup");
    popup.classList.remove("hidden");
    console.log(sensorId);
    globalSensorId = sensorId;

    // Zoek het juiste station en sensor
    let selectedSensor;
    input_data.forEach(station => {
        let sensor = station.sensors.find(s => s.id === sensorId);
        if (sensor) {
            selectedSensor = sensor;
            //console.log(selectedSensor);
        }
    });

    if (!selectedSensor) {
        console.error(`Geen sensor gevonden met ID ${sensorId}`);
        return;
    }

    // Prepareer data voor de grafiek
    const data = {
        timestamps: selectedSensor.measurements.map(m => m.timestamp.split("T")[1]), // Gebruik tijd
        values: selectedSensor.measurements.map(m => parseFloat(m.value)),
    };

    // Render grafiek
    initializeDetailsChart(data);
}

// Event listener om de popup te sluiten
//is dees wel de move
document.getElementById('close-popup').addEventListener('click', function () {
    document.querySelector('.leaflet-control-zoom').style.display = 'block';
    document.getElementById('popup').classList.add('hidden');
});