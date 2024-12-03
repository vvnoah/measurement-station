// Global variables
let selectedIds = []; // Array to track selected station IDs
let temperature_chart, windspeed_chart, rainfall_chart, airquality_chart;
let temperature_chart_popup, windspeed_chart_popup, rainfall_chart_popup, airquality_chart_popup;
let stationData = []; // Store station data for reference

let selectedStations = []

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
        const station = stationData.find(s => s.id === stationId)

        if (isChecked) {
            if (selectedIds.length >= 3) {
                alert("You can only select a maximum of 3 stations.");
                $(this).prop('checked', false);
                return;
            }
            selectedStations.push(station)
            selectedIds.push(stationId);
        } else {
            selectedStations.pop(station)
            selectedIds = selectedIds.filter(id => id !== stationId);
        }

        updateSelection();
    });
});

// Fetch data from the API
async function fetch_data() {
    const response = await fetch('/api/stations');
    return await response.json();
}

function updateSelection() {
    syncAvailableSensorsWithSelection()
    syncCheckboxesWithSelection()
    syncMarkersWithSelection()
}

function syncAvailableSensorsWithSelection() {
    console.log(selectedStations)
    const availableSensors = document.querySelector("available-sensors")
    const json = JSON.stringify(selectedStations)
    availableSensors.setAttribute("data", json)
}

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
            color: "royalblue",
            fillColor: isSelected ? "royalblue" : "limegreen"
        });
    }
}

// Add datasets to all charts
function addDatasetToCharts(station) {
    addDatasetToChart(temperature_chart_popup, station, 'temperature');
    addDatasetToChart(windspeed_chart_popup, station, 'windspeed');
    addDatasetToChart(rainfall_chart_popup, station, 'rainfall');
    addDatasetToChart(airquality_chart_popup, station, 'airquality');

    addDatasetToChart(temperature_chart, station, 'temperature');
    addDatasetToChart(windspeed_chart, station, 'windspeed');
    addDatasetToChart(rainfall_chart, station, 'rainfall');
    addDatasetToChart(airquality_chart, station, 'airquality');
}

// Remove datasets from all charts
function removeDatasetFromCharts(stationId) {
    removeDatasetFromChart(temperature_chart_popup, stationId);
    removeDatasetFromChart(windspeed_chart_popup, stationId);
    removeDatasetFromChart(rainfall_chart_popup, stationId);
    removeDatasetFromChart(airquality_chart_popup, stationId);

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
function popup() {
    document.querySelector('.leaflet-control-zoom').style.display = 'none';
    // Toon de popup
    document.getElementById('popup').classList.remove('hidden');
}

// Event listener om de popup te sluiten
document.getElementById('close-popup').addEventListener('click', function () {
    document.querySelector('.leaflet-control-zoom').style.display = 'block';
    document.getElementById('popup').classList.add('hidden');
});
