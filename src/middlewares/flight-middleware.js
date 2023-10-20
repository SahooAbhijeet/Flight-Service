const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
 
function validateCreateRequest(req, res, next) {
    if(!req.body.flightNumber) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['Flight Number not found in the incoming request'], StatusCodes.NOT_FOUND);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.airplaneId) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['Airplane-id not found in the incoming request'], StatusCodes.NOT_FOUND);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.departureAirportId) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['Departure-airport-id not found in the incoming request'], StatusCodes.NOT_FOUND);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.arrivalAirportId) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['Arrival-airport-id  not found in the incoming request'], StatusCodes.NOT_FOUND);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.arrivalTime) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['Arrival-time not found in the incoming request'], StatusCodes.NOT_FOUND);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.departureTime) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['Departure-time not found in the incoming request'], StatusCodes.NOT_FOUND);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.price) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['Price not found in the incoming request'], StatusCodes.NOT_FOUND);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.totalSeats) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['Total-seats not found in the incoming request'], StatusCodes.NOT_FOUND);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    next(); 
}

function validateUpdateSeatRequest(req, res, next) {
    if(!req.body.seats) {
        ErrorResponse.message = 'Something went wrong while updating flight';
        ErrorResponse.error = new AppError(['Seats not found in the incoming request'], 
        StatusCodes.NOT_FOUND);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    } 
    next(); 
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeatRequest
}