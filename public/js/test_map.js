//Creëer Leaflet-kaart
var map = L.map('map').setView([51.1000, 4.4517], 8);

//basislaag 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

async function fetch_data() {
    const response = await fetch('/api/stations');
    const data = await response.json();
    //console.log(data); 
    return data;
}

fetch('data/flanders.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: 'grey',
                    weight: 1,
                    fillOpacity: 0.5
                };
            },
            pointToLayer: function (feature, latlng) {
                return null;
            }
        }).addTo(map);

        // Fetch station data na GeoJSON
        fetch_data().then(data => {
            addMarkers(data.stations);
        });
    })
    .catch(error => console.error('Error loading the geoJSON file:', error));

// function addMarkers() {
//     var marker1 = L.circleMarker([50.9304, 5.3372], {
//         radius: 10,
//         color: "#ff0000",
//         fillColor: "#ff0000",
//         fillOpacity: 0.5
//     }).addTo(map);

//     marker1.bindPopup('<b>Hasselt!</b><br>Welkom in Hasselt.');

//     var marker2 = L.circleMarker([51.2194, 4.4025], {
//         radius: 10,
//         color: "#ff0000",
//         fillColor: "#ff0000",
//         fillOpacity: 0.5
//     }).addTo(map);

//     marker2.bindPopup('<b>Antwerpen!</b><br>Welkom in Antwerpen.');

// }


function addMarkers(stations) {
    stations.forEach(station => {
        var marker = L.circleMarker(station.coordinates, {
            radius: 10,
            color: "#ff0000",
            fillColor: "#ff0000",
            fillOpacity: 0.5,

        }).addTo(map);

        marker.bindPopup(`<b>${station.name}</b><br>Coordinaten: ${station.coordinates[0]}, ${station.coordinates[1]}`);
    });
}

fetch_data().then(data => {
    addMarkers(data.stations);
});


// // Stap 2: Voeg een SVG-element toe aan de Leaflet-kaart voor D3
// var svgLayer = L.svg().addTo(map);

// // Stap 3: Data (coördinaten met temperatuurwaarden)
// var data = [{
//         coords: [50.9304, 5.3372],
//         temp: 20
//     }, // Hasselt
//     {
//         coords: [51.2194, 4.4025],
//         temp: 17
//     } // Antwerpen
// ];

// // Stap 4: Definieer een kleurenschaal op basis van temperatuur (voor D3 cirkels)
// var colorScale = d3.scaleSequential(d3.interpolatePlasma).domain([10, 25]); // Temperatuurbereik tussen 10°C en 25°C

// // Stap 5: Gebruik D3 om cirkels op de juiste coördinaten te tekenen
// var svg = d3.select('#map').select('svg');
// var g = svg.append('g');

// // Projecteer elk datapunt op de kaart en teken een cirkel (D3)
// data.forEach(function (d) {
//     var point = map.latLngToLayerPoint(d.coords);

//     g.append('circle')
//         .attr('cx', point.x)
//         .attr('cy', point.y)
//         .attr('r', 10) // Radius van de cirkel
//         .attr('fill', colorScale(d.temp)) // Kleur gebaseerd op temperatuur
//         .attr('fill-opacity', 0.8)
//         .attr('stroke', 'black')
//         .attr('stroke-width', 1)
//         .style("pointer-events", "none"); // Zorg ervoor dat D3 niet de Leaflet klikken blokkeert
// });

// // Stap 6: Update de D3 cirkelposities wanneer de kaart verschuift of zoemt
// map.on("zoomend", update);
// map.on("moveend", update);

// function update() {
//     // Update de posities van de cirkels in D3
//     data.forEach(function (d) {
//         var point = map.latLngToLayerPoint(d.coords);

//         g.selectAll('circle')
//             .attr('cx', point.x)
//             .attr('cy', point.y);
//     });
// }