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
            { data: 'description' }
        ],
    });

    // Handle checkbox toggle in the DataTable
    $('#datatable tbody').on('change', '.select-checkbox', function () {
        const stationId = $(this).data('id');
        const isChecked = $(this).is(':checked');
        //station word nergens gebruikt
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
    fetch_data().then(data => {
        temperature_chart = create_line_chart("temperature-chart", "Temperatuur (°C)");
        windspeed_chart = create_line_chart("windspeed-chart", "Windsnelheid (km/u)");
        rainfall_chart = create_line_chart("rainfall-chart", "Neerslag (mm)");
        airquality_chart = create_line_chart("airquality-chart", "PPM-waarden");
    });

});

// Fetch data from the API
//dees alleen maar voor api zeker
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

// Update section visibility
function update_section_visibility() {
    document.getElementById("section-selected-data").style.display = selectedIds.length > 0 ? "block" : "none";
}