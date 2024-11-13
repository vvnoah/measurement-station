//GET INPUT DATA
//SET FILTER OPTIONS IN TEMPLATE
//GET CHOSEN FILTERS FROM TEMPLATE
//FILTER DATA
//OUTPUT DATA TO TEMPLATE

let input_data

let container = document.querySelector(".filter-container")
let menu_toggle = document.querySelector(".filter-menu-toggle")
let menu_container = document.querySelector(".filter-menu-container")
let active_filter_container = document.querySelector(".active-filter-container")

let is_menu_open = false
function toggle_menu() {
    if (is_menu_open) {
        menu_container.style.display = "none"
    } else {
        menu_container.style.display = "grid"
    }
    is_menu_open = !is_menu_open
    console.log(is_menu_open)
    console.log("hello")
}
menu_toggle.addEventListener("click", toggle_menu)