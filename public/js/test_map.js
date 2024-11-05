//Creëer Leaflet-kaart
//var map = L.map('map').setView([51.1000, 4.4517], 8);
var map = L.map('map', {
    maxZoom: 20, // kan niet verder inzoomen dan dit zoom level (maximum)
    minZoom: 8, // kan niet verder inzoomen dan dit zoom level (minimum)
    maxBoundViscosity: 1.0,
    zoomControl: false, // Zoom via + en - knop 
    scrollWheelZoom: false, // Zoom via scrollen
    doubleClickZoom: true, // Zoom via dubbelklikken
    boxZoom: false, // Uitschakelen van zoomen via het slepen van een selectie
    dragging: true, // Links en Rechts slepen van de kaart
    zoomSnap: 0.1,
}).setView([51.1000, 4.4517]);

new L.Control.Zoom({
    position: 'bottomright',
}).addTo(map);


// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);

async function fetch_data() {
    const response = await fetch('/api/stations');
    const data = await response.json();
    console.log(data);
    return data;
}

// Fetch and display the greyed-out Flanders region from the geoJSON file
fetch('data/flanders.geojson')
    .then(response => response.json())
    .then(data => {
        var flandersLayer = L.geoJSON(data, {
            style: function (feature) {
                return {
                    fillColor: 'grey',
                    color: 'white',
                    weight: 0.5,
                    fillOpacity: 0.5
                };
            },
            pointToLayer: function (feature, latlng) {
                return null; // Prevent markers from being displayed from the GeoJSON
            }
        }).addTo(map);

        // Zoom automatically to the Flanders region
        let bounds = flandersLayer.getBounds();
        map.fitBounds(bounds);
        map.setMaxBounds(bounds);

        // Fetch station data after GeoJSON is loaded
        fetch_data().then(data => {
            addMarkers(data);
        });
    })
    .catch(error => console.error('Error loading the geoJSON file:', error));

lastClickedMarker = null;
var i = 1;

let markersMap = {}; // Map of station IDs to marker objects
let clickmarkers = [];
function addMarkers(stations) {
    stations.forEach(station => {
        var marker = L.circleMarker([station.latitude, station.longitude], {
            radius: 6,
            color: "#ff0000",
            fillColor: "#ff0000",
            fillOpacity: 1
        }).addTo(map);

        // Store the station ID in the marker 
        marker.stationId = station.id;
        markersMap[station.id] = marker; // Save the marker in the map for synchronization

        marker.on('mouseover', function () {
            marker.openPopup();
        });
        marker.on('mouseout', function () {
            marker.closePopup();
        });

        // Add the click event to toggle selection
        marker.on('click', function () {
            const stationIndex = selected.findIndex(s => s.id === station.id);
            let checkbox = document.querySelector(`input[name="selected"][data-id="${station.id}"]`);

            if (selected.length < 3 || stationIndex > -1) {
                if (stationIndex === -1) {
                    // Select marker
                    marker.setStyle({ color: "green", fillColor: "green" });
                    //selected.push(station);
                    clickmarkers.push(marker.stationId);
                    if (checkbox) checkbox.checked = true; // Sync list checkbox
                    checkbox.dispatchEvent(new Event('change'));
                    console.log("event 1 fired");
                } else {
                    // Deselect marker
                    marker.setStyle({ color: "red", fillColor: "red" });
                    //selected.splice(stationIndex, 1);
                    clickmarkers.splice(clickmarkers.indexOf(marker.stationId), 1);
                    if (checkbox) checkbox.checked = false; // Sync list checkbox
                    checkbox.dispatchEvent(new Event('change'));
                    console.log("event 2 fired");
                }
                console.log(selected);
            } else {
                alert("You can only select up to 3 stations at the same time.");
            }
        });

        // Create a popup with information and bind it to the marker
        var today = new Date();
        var h = today.getHours(); // Get current hour for data display
        marker.bindPopup(`<b>${station.location}</b><br>Temperature: ${station.temperature[h].y}°C<br>Windspeed: ${station.windspeed[h].y} km/u`);
    });
}


fetch_data().then(data => {
    addMarkers(data.stations);
});