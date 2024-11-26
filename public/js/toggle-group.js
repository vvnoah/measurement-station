class ToggleGroup extends HTMLElement {
	connectedCallback() {
        this.addEventListener("click", this.#handleClick);
    }
    
    disconnectedCallback() {
        this.removeEventListener("click", this.#handleClick);
    }

	// Properties
    get multiple() {
        return this.hasAttribute("multiple");
    }
    
    set multiple(value) {
        if (value === true) {
            this.setAttribute("multiple", "");
        } else {
            this.removeAttribute("multiple");
        }
    }

    get value() {
        const value_list = [];

        for (let btn of this.querySelectorAll("[aria-pressed=true]")) {
            value_list.push(btn.value);
        }

        if (value_list.length === 0) return;

        return this.multiple ? value_list : value_list[0];
    }

    set value(val) {
        if (!Array.isArray(val)) {
            // Ensure we are always working with an array, for simplicity.
            this.#setState([val]);
        } else if (val.length > 1 && !this.multiple) {
            // If this is a single-select toggle group and there's more than one
            // value in the array, we ignore all but the first value.
            this.#setState([val[0]]);
        } else {
            // Assigned value is fine as-is.
            this.#setState(val);
        }
    }

	// Internal methods
    #handleClick(event) {
        const target = event.target;
    
        // Bail out, in case someone puts a non-button element inside this component
        if (target.localName !== "button") return;
    
        // Prevent form submission when the toggle group is inside a form element
        // for progressive enhancement
        event.preventDefault();
    
        // If the toggle group is a multi-select, toggle the event target and
        // we're all done, otherwise set the state of the control
        if (this.multiple) {
            this.#toggleState(target);
        } else {
            this.#setState([target.value]);
        }
    
        this.dispatchEvent(new CustomEvent(
            "togglechange",
            { detail: { value: this.value } },
        ));
    }

    #setState(state) {
        for (let btn of this.querySelectorAll("button")) {
            const pressed = state.includes(btn.value) ? "true" : "false";
            btn.setAttribute("aria-pressed", pressed);
        }
    }

    #toggleState(button) {
        const currentValue = button.getAttribute("aria-pressed");
        const toggledValue = currentValue === "true" ? "false" : "true";
        button.setAttribute("aria-pressed", toggledValue);
    }
}

customElements.define("toggle-group", ToggleGroup);