var globalSensorId;

//popup open
function popup(sensorId) {
    const popup = document.getElementById("popup");
    popup.classList.remove("hidden");
    globalSensorId = sensorId;
}