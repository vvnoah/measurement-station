// Initialiseer flatpickr voor een enkele datumselectie
flatpickr("#singleDate", {
    dateFormat: "Y-m-d", // Standaard datumnotatie
    allowInput: true, // Sta handmatige invoer toe
});

// Initialiseer flatpickr voor een datumreeksselectie
flatpickr("#dateRange", {
    mode: "range", // Zet modus op 'range' voor begindatum en einddatum
    dateFormat: "Y-m-d",
    allowInput: true,
});