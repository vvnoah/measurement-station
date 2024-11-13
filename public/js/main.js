// Global variables
let selected = [];
let temperature_chart, windspeed_chart, rainfall_chart, airquality_chart;
let clickmarkers = [];

$(document).ready(function () {
    // Initialize DataTable with AJAX loading from /api/stations
    const table = $("#datatable").DataTable({
        ajax: {
            url: '/api/stations',
            dataSrc: '' // Assumes response is a JSON array
        },
        columns: [
            {
                data: null,
                render: function (data, type, row) {
                    // Render checkbox in first column
                    return `<input type="checkbox" class="select-checkbox" data-id="${row.id}">`;
                }
            },
            { data: 'id' },
            { data: 'location' }
        ],
        paging: true,
        pageLength: 10, 
        searching: true,
        columnDefs: [{
            orderable: false,
            className: 'select-checkbox',
            targets: 0
    }],
    order: [[1, 'asc']],
    });

   

    // Toggle Map and List View
    document.getElementById('toggle-map-list').addEventListener('change', function () {
        const isMapView = this.checked;
        const mapElement = document.querySelector('#map');
        const listElement = document.querySelector('#datatable-container');
        if (isMapView) {
            mapElement.classList.add('hide');
            listElement.classList.remove('hide');
        } else {
            mapElement.classList.remove('hide');
            listElement.classList.add('hide');
        }
    });

    // Initialize charts after fetching initial data for labels, etc.
    fetch_data().then(data => {
        temperature_chart = create_line_chart("temperature-chart", "Temperatuur (°C)");
        windspeed_chart = create_line_chart("windspeed-chart", "Windsnelheid (km/u)");
        rainfall_chart = create_line_chart("rainfall-chart", "Neerslag (mm)");
        airquality_chart = create_line_chart("airquality-chart", "PPM-waarden");
        update_section_visibility();
    });

    // Event Listener for checkbox click inside DataTable to handle selection
    $('#datatable tbody').on('change', '.select-checkbox', function () {
        const stationId = $(this).data('id');
        const isChecked = $(this).is(':checked');

        // Get the station data from DataTable row
        const rowData = table.row($(this).closest('tr')).data();

        if (isChecked) {
            if (selected.length >= 3) {
                alert("You can only select a maximum of 3 items.");
                $(this).prop('checked', false);
                return;
            }
            selected.push(rowData);
            clickmarkers.push(stationId); // Sync with map markers
            console.log(clickmarkers);
            console.log(selected);
            
            // Add dataset to each chart
            addDatasetToChart(temperature_chart, rowData, 'temperature');
            addDatasetToChart(windspeed_chart, rowData, 'windspeed');
            addDatasetToChart(rainfall_chart, rowData, 'rainfall');
            addDatasetToChart(airquality_chart, rowData, 'airquality');

            // Set corresponding map marker color
            const marker = markersMap[stationId];
            if (marker) marker.setStyle({ color: "green", fillColor: "green" });
        } else {
            // Remove from selected and uncheck map marker if unchecked in table
            selected = selected.filter(s => s.id !== stationId);
            clickmarkers = clickmarkers.filter(id => id !== stationId);

            removeDatasetFromChart(temperature_chart, stationId);
            removeDatasetFromChart(windspeed_chart, stationId);
            removeDatasetFromChart(rainfall_chart, stationId);
            removeDatasetFromChart(airquality_chart, stationId);

            const marker = markersMap[stationId];
            if (marker) marker.setStyle({ color: "red", fillColor: "red" });
        }

        // Update section visibility
        update_section_visibility();
    });

    // Synchronize table checkboxes with map marker selection
    function syncCheckboxWithMap() {
        $('#datatable tbody .select-checkbox').each(function () {
            const stationId = $(this).data('id');
            $(this).prop('checked', selected.some(s => s.id === stationId));
        });
    }

    // Update visibility of section based on selection count
    function update_section_visibility() {
        document.getElementById("section-selected-data").style.display = selected.length === 0 ? "none" : "block";
    }

    // Fetch data from the API
    async function fetch_data() {
        const response = await fetch('/api/stations');
        const data = await response.json();
        return data;
    }

    // Function to add dataset to a chart
    function addDatasetToChart(chart, station, dataType) {
        chart.data.datasets.push({
            id: station.id,
            label: station.location,
            data: station[dataType] // Assumes each type (temperature, windspeed, etc.) is an array
        });
        chart.update();
    }

    // Function to remove dataset from a chart
    function removeDatasetFromChart(chart, stationId) {
        chart.data.datasets = chart.data.datasets.filter(dataset => dataset.id !== stationId);
        chart.update();
    }

    // Function to create a line chart
    function create_line_chart(elementId, title) {
        return new Chart(document.getElementById(elementId).getContext('2d'), {
            type: 'line',
            data: {
                labels: [], // Replace with actual labels if available
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
});
