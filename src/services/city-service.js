const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const cityRepository =  new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        console.log(error)
        if(error.name == 'SequelizeValidateError' || 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot able to create the city successfully', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        throw new AppError('Cannot able to delete the city successfully', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity() {
    try {
        const airplane = await cityRepository.getAll();
        return airplane;
    } catch (error) {
        throw new AppError('Cannot fetched all the cities successfully', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    deleteCity,
    getCity

}