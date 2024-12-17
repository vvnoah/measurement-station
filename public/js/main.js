// Global variables
let selectedIds = []; // Array to track selected station IDs
let temperature_chart, windspeed_chart, rainfall_chart, airquality_chart;
let stationData = []; // Store station data for reference

let selectedStations = [];
let specificData = [];

$(document).ready(async function () {
    showLoadingOverlay();

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
            { data: 'name'},
            { data: 'id' },
            { data: 'description' }
        ],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 25, 50],
            [5, 10, 25, 50]
        ]
    });

    addMarkers(stationData);

    hideLoadingOverlay();

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

function showLoadingOverlay() 
{
    document.getElementById("loading-overlay").style.display = "flex";
}

function hideLoadingOverlay()
{
    document.getElementById("loading-overlay").style.display = "none";
}

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
    const station = stationData.find(s => s.id === stationId);
    const marker = markersMap[stationId];

    if (marker && station) {
        const baseColor = station.onlineStatus === 'Online' ? "limegreen" : "crimson";

        const color = isSelected ? "royalblue" : baseColor;

        marker.setStyle({
            color: color,
            fillColor: color
        });
    }
}

// Update section visibility
function update_section_visibility() {
    document.getElementById("section-selected-data").style.display = selectedIds.length > 0 ? "block" : "none";
}