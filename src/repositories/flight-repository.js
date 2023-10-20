const {Sequelize} = require('sequelize');
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, sequelize, City} = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }
    async  getAllFlights(filter, sort) {
        const response =  await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                model: Airplane,
                required: true,
                as: 'airplane_detail'
                },
                {
                model: Airport,
                required: true,
                as: 'departure_airport',
                on: {
                    col1:  Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departure_airport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    },
                },
                {
                model: Airport,
                required: true,
                as: 'arrival_airport',
                on: {
                    col1:  Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrival_airport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
           ]
       });
            return response;
    }

    async updateRemainingSeats(flightId, seats, dec=true) {
        const flight = await Flight.findByPk(flightId);
        if(parseInt(dec)) {
            await flight.decrement('totalSeats', {by: seats});
        } else {
            await flight.increment('totalSeats', {by: seats});
            }
            await flight.save();
            return flight;
        }
    }
    
module.exports = FlightRepository;