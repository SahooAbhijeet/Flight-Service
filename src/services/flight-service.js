const { FlightRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');


const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error)
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create the flight successfully', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = "23:59:00";
    if(query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 2000 : maxPrice)]
        }
    }

    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, tripDate + endingTripTime] 
        }
    }

    if(query.sort) {
        const params = query.sort.split(",");
        const sortFilters = params.map((param) => param.split("_"));
        sortFilter = sortFilters;

    }

    console.log(customFilter, sortFilter);
    
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error)
        throw new AppError('Cannot fetch data of all flights successfully', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not available', error.statusCode)
        }
        throw new AppError('Cannot fetched data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}