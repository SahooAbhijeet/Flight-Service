const { City } = require("../models");
const CrudRepository = require("./crud-repository");

class CityRepository extends CrudRepository {
    constructor() {
        super(City);
    }
}

module.exports = CityRepository;