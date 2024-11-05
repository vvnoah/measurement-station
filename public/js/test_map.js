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

        marker.stationId = station.id; // Add station ID for reference
        markersMap[station.id] = marker; // Save marker in the map for later use

        // Marker click event
        marker.on('click', function () {
            const markerIndex = clickmarkers.indexOf(marker.stationId);
            let checkbox = document.querySelector(`input[name="selected"][data-id="${station.id}"]`);

            if (clickmarkers.length < 3 || markerIndex > -1) {
                if (markerIndex === -1) {
                    // Select marker
                    marker.setStyle({
                        color: "green",
                        fillColor: "green"
                    });
                    clickmarkers.push(marker.stationId);
                    checkbox.checked = true; // Check the corresponding checkbox
                    checkbox.dispatchEvent(new Event('change')); // Trigger change event
                } else {
                    // Deselect marker
                    marker.setStyle({
                        color: "red",
                        fillColor: "red"
                    });
                    clickmarkers.splice(markerIndex, 1);
                    checkbox.checked = false; // Uncheck the corresponding checkbox
                    checkbox.dispatchEvent(new Event('change')); // Trigger change event
                }
            } else {
                alert("You can only select up to 3 stations at the same time.");
            }
        });

        // Add popup for more info
        var today = new Date();
        var h = today.getHours();
        marker.bindPopup(`<b>${station.location}</b><br>Temperature:${station.temperature[h].y}°C<br>Windspeed:${station.windspeed[h].y}km/u`);
    });
}


fetch_data().then(data => {
    addMarkers(data.stations);
});