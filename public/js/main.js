// Constants
const MAX_SELECTED_STATIONS = 3;
const stationColors = ['green', 'red', 'blue'];

let selected = [];

// Initialize event listener for dropdown menu
document.getElementById('list-or-map-select').addEventListener('change', toggleMapOrList);

// Fetch data and initialize charts
fetch_data().then(data => {
    const temperature_chart = create_line_chart("temperature-chart", "Temperatuur (°C)");
    const windspeed_chart = create_line_chart("windspeed-chart", "Windsnelheid (km/u)");
    const table = document.getElementById("table");

    initialize_station_table(data, temperature_chart, windspeed_chart, table);
    update_section_visibility();
}).catch(error => {
    console.error('Error fetching data:', error);
});

// Toggle visibility between map and list
function toggleMapOrList() {
    const isMapSelected = this.value === 'map';
    document.querySelector('#map').classList.toggle('hide', !isMapSelected);
    document.querySelector('.container-scroll-x').classList.toggle('hide', isMapSelected);
}

// Initialize the station table with checkboxes
function initialize_station_table(data, temperature_chart, windspeed_chart, table) {
    data.forEach(station => {
        const row = table.insertRow(-1);
        const selected_cell = row.insertCell(0);
        const id_cell = row.insertCell(1);
        const location_cell = row.insertCell(2);

        // Create and append checkbox
        const checkbox = createCheckbox(station, temperature_chart, windspeed_chart);
        selected_cell.appendChild(checkbox);
        id_cell.textContent = station.id;
        location_cell.textContent = station.location;
    });
}

// Create checkbox with event listener
function createCheckbox(station, temperature_chart, windspeed_chart) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "selected";

    checkbox.addEventListener("change", () => handle_checkbox_change(checkbox, station, temperature_chart, windspeed_chart));
    return checkbox;
}

// Handle checkbox change events
function handle_checkbox_change(checkbox, station, temperature_chart, windspeed_chart) {
    if (checkbox.checked) {
        if (selected.length >= MAX_SELECTED_STATIONS) {
            alert("For your comfort, you can't select to many stations at the same time");
            checkbox.checked = false; // Deselect this checkbox if limit is reached
            return;
        }
        selectStation(station, temperature_chart, windspeed_chart);
    } else {
        deselectStation(station, temperature_chart, windspeed_chart);
    }

    update_chart_colors(temperature_chart);
    update_chart_colors(windspeed_chart);
    update_section_visibility();
}

// Select a station and update the charts
function selectStation(station, temperature_chart, windspeed_chart) {
    console.log(`Station ${station.id} selected`);
    selected.push(station);

    const color = stationColors[selected.length - 1];
    update_chart_data(temperature_chart, station, 'temperature', color);
    update_chart_data(windspeed_chart, station, 'windspeed', color);
}

// Deselect a station and update the charts
function deselectStation(station, temperature_chart, windspeed_chart) {
    console.log(`Station ${station.id} deselected`);
    selected = selected.filter(s => s.id !== station.id);
    remove_chart_data(temperature_chart, station.id);
    remove_chart_data(windspeed_chart, station.id);
}

// Update chart data with color
function update_chart_data(chart, station, type, color) {
    chart.data.datasets.push({
        id: station.id,
        label: station.location,
        data: station[type],
        borderColor: color,
        backgroundColor: `${color}33`,
        pointBackgroundColor: 'grey',
        pointBorderColor: 'white'
    });
    chart.update();
}

// Update the chart colors based on current selections
function update_chart_colors(chart) {
    chart.data.datasets.forEach((dataset, index) => {
        if (selected[index]) {
            const colorIndex = selected.indexOf(selected[index]);
            dataset.borderColor = stationColors[colorIndex];
            dataset.backgroundColor = `${stationColors[colorIndex]}33`;
        } else {
            dataset.borderColor = 'rgba(0, 0, 0, 0.1)';
            dataset.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
    });
    chart.update();
}

// Fetch data from the API
async function fetch_data() {
    const response = await fetch('/api/stations');
    return await response.json();
}

// Update the visibility of the selected data section
function update_section_visibility() {
    const section = document.getElementById("section-selected-data");
    section.style.display = selected.length === 0 ? "none" : "block";
}

// Remove chart data when a station is deselected
function remove_chart_data(chart, stationId) {
    chart.data.datasets = chart.data.datasets.filter(dataset => dataset.id !== stationId);
    chart.update();
}
