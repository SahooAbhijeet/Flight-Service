function addRowLockOnFlight(flightId) {
    return `SELECT * FROM FLIGHTS WHERE Flights.id =${flightId} FOR UPDATE;`
}
module.exports = {
    addRowLockOnFlight
}