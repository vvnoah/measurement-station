// Initialize the map with the specified settings
var map = L.map('map', {
    maxZoom: 20,
    minZoom: 8,
    maxBoundViscosity: 1.0,
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: true,
    boxZoom: false,
    dragging: true,
    zoomSnap: 0.1,
}).setView([51.1000, 4.4517]);

//legende toevoegen links boven op de kaart
const legend = L.control({
    position: "topleft",
});

legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `
        <i class="circle" style="background: blue"></i> Geselecteerd Station<br>
        <i class="circle" style="background: green"></i> Online Stations<br>
        <i class="circle" style="background: red"></i> Offline Stations<br>
    `;
    return div;
};

legend.addTo(map);

new L.Control.Zoom({
    position: 'bottomright',
}).addTo(map);

// Fetch data from the API
async function fetch_data() {
    const response = await fetch('/api/stations');
    const data = await response.json();
    //console.log(data);
    return data;
}

// Load the greyed-out Flanders region from GeoJSON
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

// Map of station IDs to marker objects
let markersMap = {};

// Function to add markers for stations on the map
// Add markers to the map
function addMarkers(stations) {
    //console.log(stations.latitude);
    stations.forEach(station => {
        // Log the individual station, not the entire array each iteration
        //console.log("Station:", station);

        // Create a circle marker for each station using latitude and longitude
        const marker = L.circleMarker([station.latitude, station.longitude], {
            radius: 6,
            color: "green",
            fillColor: "green",
            fillOpacity: 1,
        }).addTo(map);

        // Store marker in the markersMap if necessary (by id)
        markersMap[station.id] = marker;

        marker.on('mouseover', function () {
            marker.openPopup();
            showStationTemperaturePopup(station);
            marker.setStyle({
                radius: 8
            });
        });
        marker.on('mouseout', function () {
            marker.closePopup();
            marker.setStyle({
                radius: 6
            });
        });

        // Marker click event
        marker.on('click', function () {
            const isSelected = selectedIds.includes(station.id);

            if (!isSelected && selectedIds.length >= 3) {
                alert("You can only select up to 3 stations.");
                return;
            }

            if (!isSelected) {
                selectedIds.push(station.id);
            } else {
                selectedIds = selectedIds.filter(id => id !== station.id);
            }

            syncCheckboxesWithSelection();
            syncMarkersWithSelection();
        });

        //marker.bindPopup(`<b>${station.description}</b><br>Temperature: °C`);
    });
}

function showStationTemperaturePopup(station) {
    const temperature = getLastTemperature(station); // Haal de laatste temperatuurwaarde op
    const popupContent = temperature 
        ? `<b>${station.description}:</b> <br>${temperature}°C ` 
        : `<b>${station.description}:<b> <br>Geen temperatuurdata beschikbaar`;

    // Maak of update een popup op de juiste locatie
    L.popup()
        .setLatLng([station.latitude, station.longitude]) // Zet de locatie van de popup
        .setContent(popupContent) // Zet de inhoud van de popup
        .openOn(map); // Toon de popup op de kaart
}

// Functie om de laatste temperatuurwaarde op te halen
function getLastTemperature(station) {
    const temperatureSensor = station.sensors.find(sensor => sensor.type === "temperature");
    if (!temperatureSensor || !temperatureSensor.measurements.length) {
        return null; // Geen temperatuurdata beschikbaar
    }

    const lastMeasurement = temperatureSensor.measurements.at(-1); // Pak de laatste meting
    return lastMeasurement ? lastMeasurement.sensorValue : null;
}

markersMap[station.id] = marker;

marker.on('mouseover', function () {
    marker.openPopup();
    marker.setStyle({
        radius: 8
    });
});
marker.on('mouseout', function () {
    marker.closePopup();
    marker.setStyle({
        radius: 6
    });
});

// Marker click event
marker.on('click', function () {
    const isSelected = selectedIds.includes(station.id);

    if (!isSelected && selectedIds.length >= 3) {
        alert("You can only select up to 3 stations.");
        return;
    }

    if (!isSelected) {
        selectedIds.push(station.id);
    } else {
        selectedIds = selectedIds.filter(id => id !== station.id);
    }

    syncCheckboxesWithSelection();
    syncMarkersWithSelection();
});

//marker.bindPopup(`<b>${station.location}</b><br>Temperature: ${station.temperature[0].y}°C`);

// Fetch data and add markers when map loads
/*
fetch_data().then(data => {
    addMarkers(data.stations);
});
*/