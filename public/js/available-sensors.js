let checkedSensorName;
class AvailableSensors extends HTMLElement 
{
    constructor() {
        super();
        this.attachShadow({mode: "open"})
        this.shadowRoot.innerHTML = `
            <style>
                #header-container {
                    display: grid;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
                }
                #header {
                    padding-block: 0.5rem;
                    padding-inline: 1rem;
                    color: var(--clr-txt-header, white);
                    background-color: var(--clr-bg-header, royalblue);
                }
                #menu {
                    display: none;
                }
                #menu:has(.item) {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    padding-block: 1rem;
                    padding-inline: 0.5rem;
                    border: var(--border-menu, 0.2rem solid royalblue);
                }
                .item {
                    color: var(--clr-txt-item, black);
                    background-color: var(--clr-bg-item, transparent);
                    border: var(--border-item, 0.1rem outset royalblue);
                }
                .item label {
                    user-select: none;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1em;
                    padding: 0.4rem;
                }
                .item input {
                    display: none;
                }
                .item:has(input:checked) {
                    color: var(--clr-txt-item-checked, white);
                    background-color: var(--clr-bg-item-checked, royalblue);
                    border: var(--border-item-checked, 0.1rem outset royalblue);
                }
                #output {
                    display: none;
                }
                #output:has(.card) {
                    padding-block: 2rem;
                    display: grid;
                    gap: 2rem;
                }
                .card {
                    display: grid;
                    padding: 1rem;
                    border: var(--border-card, 0.2rem solid black)
                }
            </style>
            <div id="container">
                <div id="header-container">
                    <div id="header">
                        <b>
                            <span id="amount-selected">0</span>
                            /
                            <span id="total-amount">0</span>
                        </b>
                        <b>sensoren geselecteerd</b>
                    </div>
                    <div id="menu">
    
                    </div>
                </div>
                <div id="output">
                
                </div>
            </div>`
        
        this.selectedStations = []
        this.availableSensors = []
    }
    
    connectedCallback() {
        this.update();
    }

    static get observedAttributes() {
        return ["data"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "data" && oldValue !== newValue) {
            this.update();
        }
    }

    update() {
        const data = this.getAttribute("data") || "[]"
        console.log(data)
        this.selectedStations = JSON.parse(data)
        this.availableSensors = []
        this.updateAvailableSensors()
        this.updateMenu()
        this.updateAmountSelectedLabel()
        this.updateOutput()
    }

    updateAvailableSensors() {
        let i = 0
        this.selectedStations.forEach(station => {
            station.sensors.forEach(sensor => {
                if(this.availableSensors.some(x => x.id === sensor.id)) return
                this.availableSensors.push({ id: sensor.id, type: sensor.type, isChecked: false})
                i++
            })
        })
        this.shadowRoot.querySelector("#total-amount").textContent = i
    }

    updateMenu() {
        let menu = this.shadowRoot.querySelector("#menu")
        menu.innerHTML = ""
        this.availableSensors.forEach(sensor => {
            let item = document.createElement("div")
            item.setAttribute("class", "item")
            let checkbox = document.createElement("input")
            checkbox.addEventListener("change", (ev) => this.onMenuItemChange(ev))
            checkbox.setAttribute("type", "checkbox")
            checkbox.setAttribute("id",  `checkbox-${sensor.id}`)
            let label = document.createElement("label")
            label.setAttribute("for", `checkbox-${sensor.id}`)
            label.textContent = sensor.type
            item.appendChild(checkbox)
            item.appendChild(label)
            menu.appendChild(item)
        })
    }

    onMenuItemChange(event) {
        const checkboxId = parseInt(event.target.id.replace("checkbox-", ""), 10)
        const sensor = this.availableSensors.find(x => x.id === checkboxId)
        sensor.isChecked = event.target.checked
        this.updateAmountSelectedLabel()
        this.updateOutput()
    }

    updateAmountSelectedLabel() {
        const amountSelected = this.availableSensors.filter(x => x.isChecked).length
        this.shadowRoot.querySelector("#amount-selected").textContent = amountSelected
    }

    updateOutput() {
        let output = this.shadowRoot.querySelector("#output");
        output.innerHTML = "";
    
        // Loop door de geselecteerde sensoren
        this.availableSensors.filter(x => x.isChecked).forEach(checkedSensor => {
            let card = document.createElement("div");
            card.setAttribute("class", "card");
            card.innerHTML += `<b>${checkedSensor.type}</b>`;
            checkedSensorName = checkedSensor.type;
    
            // Verzamel gegevens van alle stations voor deze sensor
            let sensorData = [];
            this.selectedStations.forEach(station => {
                station.sensors.forEach(sensor => {
                    if (sensor.id === checkedSensor.id) {
                        sensorData.push(`
                            <div>
                                <span>${station.name}: </span>
                                <span>${sensor.measurements[0].sensorValue}</span>
                                <span>${sensor.unit}</span>
                            </div>
                        `,
                    
                    );
                    }
                });
            });
    
            // Voeg de verzamelde gegevens toe aan de card
            card.innerHTML += sensorData.join("");
    
            // Voeg slechts één details-knop toe voor de sensor
            card.innerHTML += `
                <div style="display:flex;justify-content:end;">
                    <button onclick=popup(${checkedSensor.id});><b>details</b></button>
                </div>`;
    
            output.appendChild(card);
        });
    }
    
}
customElements.define("available-sensors", AvailableSensors)