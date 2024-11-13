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

new L.Control.Zoom({
    position: 'bottomright',
}).addTo(map);

// Fetch data from the API
async function fetch_data() {
    const response = await fetch('/api/stations');
    const data = await response.json();
    console.log(data);
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
        markersMap[station.id] = marker; // Save the marker for synchronization

        // Display and hide popup on mouse events
        marker.on('mouseover', function () {
            marker.openPopup();
        });
        marker.on('mouseout', function () {
            marker.closePopup();
        });

        // Toggle marker selection on click
        marker.on('click', function () {
            const stationIndex = selected.findIndex(s => s.id === station.id);
            let checkbox = document.querySelector(`.select-checkbox[data-id="${station.id}"]`); // Corrected selector

            if (checkbox) {
                console.log("Checkbox found for station:", station.id);
            } else {
                console.error("Checkbox not found for station:", station.id);
            }

            if (selected.length < 3 || stationIndex > -1) {
                if (stationIndex === -1) {
                    // Select marker
                    marker.setStyle({ color: "green", fillColor: "green" });
                    //selected.push(station); // Add to selected list
                    //clickmarkers.push(marker.stationId);

                    if (checkbox) {
                        checkbox.checked = true; // Sync with list checkbox
                        checkbox.dispatchEvent(new Event('change')); // Trigger change event
                        $(checkbox).trigger('change'); // Trigger change event
                        //console.log(selected);
                    }
                } else {
                    // Deselect marker
                    marker.setStyle({ color: "red", fillColor: "red" });
                    selected.splice(stationIndex, 1); // Remove from selected list
                    clickmarkers.splice(clickmarkers.indexOf(marker.stationId), 1);

                    if (checkbox) {
                        checkbox.checked = false; // Sync with list checkbox
                        checkbox.dispatchEvent(new Event('change')); // Trigger change event
                        $(checkbox).trigger('change');
                    }
                }
            } else {
                alert("You can only select up to 3 stations at the same time.");
            }
        });


        // Create a popup with station data and bind to marker
        var today = new Date();
        var h = today.getHours(); // Get current hour for data display
        marker.bindPopup(`<b>${station.location}</b><br>Temperature: ${station.temperature[h].y}°C<br>Windspeed: ${station.windspeed[h].y} km/u`);
    });
}

// Fetch data and add markers when map loads
fetch_data().then(data => {
    addMarkers(data.stations);
});
