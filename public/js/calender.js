const vandaag = new Date();
const overEenWeek = new Date();
const eenWeekGeleden = new Date();
overEenWeek.setDate(vandaag.getDate() + 6); // Stel het einde van de week in (7 dagen vanaf vandaag)
eenWeekGeleden.setDate(vandaag.getDate() - 6) // Stel een week gelden in (7 dagen vanaf vandaag)

//dit nog in andere file steken
// Initialiseer flatpickr voor een enkele datumselectie
flatpickr("#singleDate", {
    dateFormat: "d-m-Y", // Standaard datumnotatie
    allowInput: true, // Sta handmatige invoer toe
    defaultDate: vandaag,
});

// Initialiseer flatpickr voor een datumreeksselectie
flatpickr("#dateRange", {
    mode: "range", // Zet modus op 'range' voor begindatum en einddatum
    dateFormat: "d-m-Y",
    allowInput: true,
    defaultDate: [eenWeekGeleden, vandaag],
});