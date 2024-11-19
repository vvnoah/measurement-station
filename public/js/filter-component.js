//GET TEMPLATE
//GET INPUT DATA
//GET FILTER OPTIONS
//  FOREACH 
//SET FILTER OPTIONS IN TEMPLATE
//GET CHOSEN FILTERS FROM TEMPLATE
//SET ACTIVE FILTERS IN TEMPLATE
//FILTER DATA ITH CHOSEN FILTERS
//OUTPUT DATA TO TEMPLATE

let input_data = [
  {
    "id": "1",
    "name": "Station A",
    "latitude": 40.7128,
    "longitude": -74.006,
    "description": "Weather station in New York",
    "sensors": [
      {
        "id": 1,
        "unit": "Celsius",
        "type": "Temperature",
        "measurements": [
          {
            "timestamp": "2024-10-15T13:31:17.1232085",
            "value": 22.5
          }
        ]
      },
      {
        "id": 2,
        "unit": "%",
        "type": "Humidity",
        "measurements": [
          {
            "timestamp": "2024-10-15T13:31:17.1232087",
            "value": 58
          }
        ]
      }
    ]
  },
  {
    "id": "2",
    "name": "Station B",
    "latitude": 34.0522,
    "longitude": -118.2437,
    "description": "Weather station in Los Angeles",
    "sensors": [
      {
        "id": 1,
        "unit": "Celsius",
        "type": "Temperature",
        "measurements": [
          {
            "timestamp": "2024-10-16T07:31:17.1232093",
            "value": 18.2
          }
        ]
      }
    ]
  }
]
let container = document.querySelector(".filter-container")
let menu_toggle = document.querySelector(".filter-menu-toggle")
let label_amount_selected = document.querySelector("#filter-amount-selected")
let menu = document.querySelector(".filter-menu")
let filters = []
let output = document.querySelector(".filter-output")

let is_menu_open = false
function toggle_menu() {
  if (is_menu_open) {
    menu.style.display = "none"
  } else {
    menu.style.display = "flex"
  }
  is_menu_open = !is_menu_open
  console.log("is menu open: ", is_menu_open)
}
menu_toggle.addEventListener("click", toggle_menu)

function main() {
  let total_amount = 0
  input_data.forEach(station => {
      station.sensors.forEach(sensor => {
        if (!filters.some(filter => filter.id === sensor.id)) {
          filters.push(
            {"id": sensor.id,"type": sensor.type, "checked": false})
          total_amount += 1
        }
    })
  })
  document.querySelector("#filter-amount-total").innerHTML = total_amount

  filters.forEach(filter => {
    let template = `
      <div class="filter" id="filter-${filter.id}">
          <input type="checkbox" name="filter-input" id="filter-input-${filter.id}">
          <label for="filter-input-${filter.id}">${filter.type}</label>
      </div>`
    menu.innerHTML += template
  })

  let amount_selected = 0
  filters.forEach(filter => {
    let input = document.getElementById("filter-input-" + filter.id)
    input.addEventListener("change", (event) => {
      if(event.currentTarget.checked) {
        filter.checked = true
        amount_selected += 1
        update_output_new()
      }
      else {
        filter.checked = false
        amount_selected -= 1
        update_output_new()
      }
      label_amount_selected.innerHTML = amount_selected
    })
  })
}
main()

function update_output() {
  output.innerHTML = ""
  filters.forEach(filter => {
    if(filter.checked == true) {
      let template = `
        <div class="filter-output-card" id="filter-output-card-${filter.id}">
          <b>${filter.type}</b>
        </div>`
      output.innerHTML += template
    }    
  })  
}

function update_output_new() {
  output.innerHTML = ""
  filters.forEach(filter => {
    if(filter.checked) {
      let stations_info = ""
      input_data.forEach(station => {
        // Find the sensor with the matching filter ID in this station
        let matchingSensor = station.sensors.find(sensor => sensor.id === filter.id);
        if (matchingSensor) {
          // Retrieve the value and unit from the first measurement
          let value = matchingSensor.measurements[0]?.value || "No data";
          let unit = matchingSensor.unit || "";
          stations_info += `
            <span>${station.name}: ${value} ${unit}</span>`;
        }
      })
      output.innerHTML += `
        <div class="filter-output-card" id="filter-output-card-${filter.id}">
            <b>${filter.type}</b>
            ${stations_info}
        </div>`
    }
  })
}