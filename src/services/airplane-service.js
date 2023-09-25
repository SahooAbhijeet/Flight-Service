const {StatusCodes} = require('http-status-codes');

const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { AirplaneService } = require('.');

 
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetched data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
 
async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        throw new AppError('Cannot fetched data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        throw new AppError('Cannot delete the airplane successfully', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id, data) {
    try {
        const airplane = await airplaneRepository.update(id, data);
        return airplane;
    } catch (error) {
        throw new AppError('Cannot update the airplane successfully', StatusCodes.INTERNAL_SERVER_ERROR); 
    }

}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}