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

let selected = [];
fetch_data().then(data => {
    let temperature_chart = create_line_chart("temperature-chart", "Temperatuur (°C)");
    let windspeed_chart = create_line_chart("windspeed-chart", "Windsnelheid (km/u)");
    let rainfall_chart = create_line_chart("rainfall-chart", "Neerslag (mm)");
    let airquality_chart = create_line_chart("airquality-chart", "PPM-waarden");

    let table_body = document.querySelector("#datatable tbody");

    data.forEach(station => {
        let row = table_body.insertRow(-1);

        let selected_cell = row.insertCell(0);
        let id_cell = row.insertCell(1);
        let location_cell = row.insertCell(2);

        // Insert the checkbox and add an event listener
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "selected";

        // Listen for when the checkbox is checked or unchecked
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                if (selected.length >= 3) {
                    alert("For your comfort you can only select 3 stations at the same time");
                    checkbox.checked = false; // Deselect this checkbox if limit is reached
                    return;
                }
                console.log(`Station ${station.id} selected`);
                selected.push(station);

                temperature_chart.data.datasets.push({ id: station.id, label: station.location, data: station.temperature });
                temperature_chart.update();
                windspeed_chart.data.datasets.push({ id: station.id, label: station.location, data: station.windspeed });
                windspeed_chart.update();
                rainfall_chart.data.datasets.push({ id: station.id, label: station.location, data: station.rainfall });
                rainfall_chart.update();
                airquality_chart.data.datasets.push({id: station.id, label: station.location, data: station.airquality });
                airquality_chart.update();
            } else {
                console.log(`Station ${station.id} deselected`);
                selected.pop(station);

                temperature_chart.data.datasets.find((dataset, index) => {
                    if (dataset.id === station.id) {
                        temperature_chart.data.datasets.splice(index, 1);
                        return true;
                    }
                });
                temperature_chart.update();

                windspeed_chart.data.datasets.find((dataset, index) => {
                    if (dataset.id === station.id) {
                        console.log(index)
                        windspeed_chart.data.datasets.splice(index, 1);
                        return true;
                    }
                });
                windspeed_chart.update();
                
                rainfall_chart.data.datasets.find((dataset, index) => {
                    if(dataset.id === station.id) {
                        rainfall_chart.data.datasets.splice(index, 1);
                        return true;
                    }
                });
                rainfall_chart.update();

                airquality_chart.data.datasets.find((dataset, index) => {
                    if (dataset.id === station.id) {
                        airquality_chart.data.datasets.splice(index, 1);
                        return true;
                    }
                });
                airquality_chart.update();
            }

            update_section_visibility();
        });

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