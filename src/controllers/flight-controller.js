const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { FlightService } = require('../services');

/**
 * POST: /flights
 * req.body{
 * flightNumber: 'UK-808'
 * airplaneId: 'a380'
 * departureAirportId: 12
 * arrivalAirportId: 8
 * arrivalTime: '11:10:00'
 * departureTime: '9:10:00'
 * price: 2000
 * boardingGate: '12A'
 * totalSeats: 120
 * }
 */
async function createFlight(req, res)  {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime, 
            departureTime: req.body.departureTime,
            price: req.body.price,  
            boardingGate: req.body.boardingGate, 
            totalSeats: req.body.totalSeats,
            });
    
            SuccessResponse.data = flight;
            return res
                    .status(StatusCodes.CREATED)
                    .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getFlight(req, res) {
    try {
        const airplane = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = airplane;
        return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function updateSeats(req, res) {
    try {
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}