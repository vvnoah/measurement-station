document.getElementById('list-or-map-select').addEventListener('change', function () {
    const selectedValue = this.value;
    const mapElement = document.querySelector('#map');
    const listElement = document.querySelector('#datatable-container');

    if (selectedValue === 'map') {
        console.log('map');
        mapElement.classList.remove('hide');
        listElement.classList.add('hide');
    } else if (selectedValue === 'list') {
        console.log('list');
        mapElement.classList.add('hide');
        listElement.classList.remove('hide');
    }
});

//global var
let selected = [];
let temperature_chart, windspeed_chart, rainfall_chart, airquality_chart;

fetch_data().then(data => {
    temperature_chart = create_line_chart("temperature-chart", "Temperatuur (°C)");
    windspeed_chart = create_line_chart("windspeed-chart", "Windsnelheid (km/u)");
    rainfall_chart = create_line_chart("rainfall-chart", "Neerslag (mm)");
    airquality_chart = create_line_chart("airquality-chart", "PPM-waarden");

    let table_body = document.querySelector("#datatable tbody");

    data.forEach(station => {
        let row = table_body.insertRow(-1);

        let selected_cell = row.insertCell(0);
        let id_cell = row.insertCell(1);
        let location_cell = row.insertCell(2);

        // Insert the checkbox and add a data attribute for station ID
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "selected";
        checkbox.setAttribute("data-id", station.id); // Reference for synchronization

        // change bij map/lijst
        checkbox.addEventListener("change", function () {
            let marker = markersMap[station.id];
            if (checkbox.checked) {
                if (selected.length >= 3) {
                    alert("For your comfort, you can only select 3 stations at the same time.");
                    checkbox.checked = false; // Prevent selection
                    return;
                }
                console.log(`Station ${station.id} selected`);
                selected.push(station);
                clickmarkers.push(station.id); // Sync map array

                addDatasetToChart(temperature_chart, station, 'temperature');
                addDatasetToChart(windspeed_chart, station, 'windspeed');
                addDatasetToChart(rainfall_chart, station, 'rainfall');
                addDatasetToChart(airquality_chart, station, 'airquality');

                if (marker) marker.setStyle({ color: "green", fillColor: "green" });
            } else {
                console.log(`Station ${station.id} deselected`);
                selected = selected.filter(s => s.id !== station.id);
                clickmarkers = clickmarkers.filter(id => id !== station.id); // Sync map array

                removeDatasetFromChart(temperature_chart, station.id);
                removeDatasetFromChart(windspeed_chart, station.id);
                removeDatasetFromChart(rainfall_chart, station.id);
                removeDatasetFromChart(airquality_chart, station.id);

                if (marker) marker.setStyle({ color: "red", fillColor: "red" });
            }
            update_section_visibility();
        });
        console.log(selected);
        selected_cell.appendChild(checkbox);
        id_cell.textContent = station.id;
        location_cell.textContent = station.location;
    });

    update_section_visibility();
});


async function fetch_data() {
    const response = await fetch('/api/stations');
    const data = await response.json();
    return data;
}

function update_section_visibility() {
    if (selected.length === 0) {
        document.getElementById("section-selected-data").style.display = "none";
    } else {
        document.getElementById("section-selected-data").style.display = "block";
    }
}

function update_datasets(data) {
    temperature = data.map(station => ({
        id: station.id,
        label: station.location,
        data: station.temperature
    }));

    windspeed = data.map(station => ({
        id: station.id,
        label: station.location,
        data: station.windspeed
    }));

    rainfall = data.map(station => ({
        id: station.id,
        label: station.location,
        data: station.rainfall
    }));

    airquality = data.map(station => ({
        id: station.id,
        label: station.location,
        data: station.airquality
    }));

    let datasets = { temperature, windspeed, rainfall, airquality };
    console.log(datasets);
    return datasets;
}

function addDatasetToChart(chart, station, dataType) {
    chart.data.datasets.push({
        id: station.id,
        label: station.location,
        data: station[dataType] // Assumes data for each type (temperature, windspeed, etc.) is an array
    });
    chart.update();
}

function removeDatasetFromChart(chart, stationId) {
    chart.data.datasets = chart.data.datasets.filter(dataset => dataset.id !== stationId);
    chart.update();
}

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