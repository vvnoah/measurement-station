// Global variables
let selectedIds = []; // Array to track selected station IDs
let temperature_chart, windspeed_chart, rainfall_chart, airquality_chart;
//let temperature_chart_popup, windspeed_chart_popup, rainfall_chart_popup, airquality_chart_popup;
let stationData = []; // Store station data for reference

$(document).ready(async function () {
    // Fetch station data and initialize
    stationData = await fetch_data();

    // Initialize DataTable
    const table = $("#datatable").DataTable({
        data: stationData,
        columns: [
            {
                data: null,
                render: function (data) {
                    return `<input type="checkbox" class="select-checkbox" data-id="${data.id}">`;
                }
            },
            { data: 'id' },
            { data: 'description' }
        ],
    });

    // Handle checkbox toggle in the DataTable
    $('#datatable tbody').on('change', '.select-checkbox', function () {
        const stationId = $(this).data('id');
        const isChecked = $(this).is(':checked');
        const station = stationData.find(s => s.id === stationId);

        if (isChecked) {
            if (selectedIds.length >= 3) {
                alert("You can only select a maximum of 3 stations.");
                $(this).prop('checked', false);
                return;
            }
            selectedIds.push(stationId);
        } else {
            selectedIds = selectedIds.filter(id => id !== stationId);
        }

        syncMarkersWithSelection();
    });

    // Sync DataTable checkboxes with the selection state on page change
    table.on('draw', function () {
        syncCheckboxesWithSelection();
    });

    // Initialize charts
    /*
    temperature_chart = create_line_chart("temperature-chart", "Temperature (°C)");
    windspeed_chart = create_line_chart("windspeed-chart", "Wind Speed (km/h)");
    rainfall_chart = create_line_chart("rainfall-chart", "Rainfall (mm)");
    airquality_chart = create_line_chart("airquality-chart", "Air Quality (PPM)");
    */
    fetch_data().then(data => {
        temperature_chart = create_line_chart("temperature-chart", "Temperatuur (°C)");
        windspeed_chart = create_line_chart("windspeed-chart", "Windsnelheid (km/u)");
        rainfall_chart = create_line_chart("rainfall-chart", "Neerslag (mm)");
        airquality_chart = create_line_chart("airquality-chart", "PPM-waarden");
/*
        temperature_chart_popup = create_line_chart("temperature-chart-popup", "Temperatuur (°C)");
        windspeed_chart_popup = create_line_chart("windspeed-chart-popup", "Windsnelheid (km/u)");
        rainfall_chart_popup = create_line_chart("rainfall-chart-popup", "Neerslag (mm)");
        airquality_chart_popup = create_line_chart("airquality-chart-popup", "PPM-waarden");
        */
    });

});

// Fetch data from the API
/*
async function fetch_data() {
    const response = await fetch('/api/stations');
    return await response.json();
}
*/
// Sync table checkboxes with the selection array
function syncCheckboxesWithSelection() {
    $('#datatable tbody .select-checkbox').each(function () {
        const stationId = $(this).data('id');
        $(this).prop('checked', selectedIds.includes(stationId));
    });
}

// Sync map markers with the selection array
function syncMarkersWithSelection() {
    selectedIds.forEach(stationId => updateMarkerStyle(stationId, true));
    stationData
        .filter(station => !selectedIds.includes(station.id))
        .forEach(station => updateMarkerStyle(station.id, false));
}

// Update marker style
function updateMarkerStyle(stationId, isSelected) {
    const marker = markersMap[stationId];
    if (marker) {
        marker.setStyle({
            color: isSelected ? "blue" : "green",
            fillColor: isSelected ? "blue" : "green"
        });
    }
}

// Add datasets to all charts
function addDatasetToCharts(station) {/*
    addDatasetToChart(temperature_chart_popup, station, 'temperature');
    addDatasetToChart(windspeed_chart_popup, station, 'windspeed');
    addDatasetToChart(rainfall_chart_popup, station, 'rainfall');
    addDatasetToChart(airquality_chart_popup, station, 'airquality');*/

    addDatasetToChart(temperature_chart, station, 'temperature');
    addDatasetToChart(windspeed_chart, station, 'windspeed');
    addDatasetToChart(rainfall_chart, station, 'rainfall');
    addDatasetToChart(airquality_chart, station, 'airquality');
}

// Remove datasets from all charts
function removeDatasetFromCharts(stationId) {/*
    removeDatasetFromChart(temperature_chart_popup, stationId);
    removeDatasetFromChart(windspeed_chart_popup, stationId);
    removeDatasetFromChart(rainfall_chart_popup, stationId);
    removeDatasetFromChart(airquality_chart_popup, stationId);*/

    removeDatasetFromChart(temperature_chart, stationId);
    removeDatasetFromChart(windspeed_chart, stationId);
    removeDatasetFromChart(rainfall_chart, stationId);
    removeDatasetFromChart(airquality_chart, stationId);
}

// Chart helper functions
function create_line_chart(elementId, title) {
    return new Chart(document.getElementById(elementId).getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: title
            }
        }
    });
}

function addDatasetToChart(chart, station, dataType) {
    chart.data.datasets.push({
        id: station.id,
        label: station.location,
        data: station[dataType],
    });
    chart.update();
}

function removeDatasetFromChart(chart, stationId) {
    chart.data.datasets = chart.data.datasets.filter(dataset => dataset.id !== stationId);
    chart.update();
}

// Update section visibility
function update_section_visibility() {
    document.getElementById("section-selected-data").style.display = selectedIds.length > 0 ? "block" : "none";
}

//popup open
function popup(sensorId) {
    const popup = document.getElementById("popup");
    popup.classList.remove("hidden");

    // Zoek het juiste station en sensor
    let selectedSensor;
    input_data.forEach(station => {
        let sensor = station.sensors.find(s => s.id === sensorId);
        if (sensor) {
            selectedSensor = sensor;
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
document.getElementById('close-popup').addEventListener('click', function () {
    document.querySelector('.leaflet-control-zoom').style.display = 'block';
    document.getElementById('popup').classList.add('hidden');
});

function initializeDetailsChart(data) {
    const chartElement = document.getElementById("details-popup-chart");

    if (chartElement.chartInstance) {
        // Update bestaande grafiek
        chartElement.chartInstance.data.labels = data.timestamps;
        chartElement.chartInstance.data.datasets[0].data = data.values;
        chartElement.chartInstance.update();
    } else {
        // Maak een nieuwe grafiek
        chartElement.chartInstance = new Chart(chartElement, {
            type: "line",
            data: {
                labels: data.timestamps,
                datasets: [{
                    label: "Sensor Waarden",
                    data: data.values,
                    borderColor: "blue",
                    backgroundColor: "lightblue",
                    fill: true,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: "Sensor Data" },
                },
            },
        });
    }
}
