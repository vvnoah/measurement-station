// Global variables
let selectedIds = []; // Array to track selected station IDs
let temperature_chart, windspeed_chart, rainfall_chart, airquality_chart;
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
            { data: 'location' }
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
            addDatasetToCharts(station);
        } else {
            selectedIds = selectedIds.filter(id => id !== stationId);
            removeDatasetFromCharts(stationId);
        }

        syncMarkersWithSelection();
        update_section_visibility();
    });

    // Toggle Map and List View
    document.getElementById('toggle-map-list').addEventListener('change', function () {
        const isChecked = this.checked;
        document.querySelector('#map').classList.toggle('hide', isChecked);
        document.querySelector('#datatable-container').classList.toggle('hide', !isChecked);
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

    update_section_visibility();
    */
    fetch_data().then(data => {
        temperature_chart = create_line_chart("temperature-chart", "Temperatuur (°C)");
        windspeed_chart = create_line_chart("windspeed-chart", "Windsnelheid (km/u)");
        rainfall_chart = create_line_chart("rainfall-chart", "Neerslag (mm)");
        airquality_chart = create_line_chart("airquality-chart", "PPM-waarden");
        update_section_visibility();
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
            color: isSelected ? "green" : "red",
            fillColor: isSelected ? "green" : "red"
        });
    }
}

// Add datasets to all charts
function addDatasetToCharts(station) {
    addDatasetToChart(temperature_chart, station, 'temperature');
    addDatasetToChart(windspeed_chart, station, 'windspeed');
    addDatasetToChart(rainfall_chart, station, 'rainfall');
    addDatasetToChart(airquality_chart, station, 'airquality');
}

// Remove datasets from all charts
function removeDatasetFromCharts(stationId) {
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
