var globalSensorId;

//popup open
function popup(sensorId) {
    const popup = document.getElementById("popup");
    popup.classList.remove("hidden");
    //console.log(sensorId);
    globalSensorId = sensorId;

    /*
    if (!selectedSensor) {
        console.error(`Geen sensor gevonden met ID ${sensorId}`);
        return;
    }
    */
}

// Event listener om de popup te sluiten
document.getElementById('close-popup').addEventListener('click', function () {
    document.querySelector('.leaflet-control-zoom').style.display = 'block';
    document.getElementById('popup').classList.add('hidden');
});