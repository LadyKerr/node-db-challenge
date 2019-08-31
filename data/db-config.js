const knex = require("knex");

const knexConnect = require("../knexfile");

module.exports = knex(knexConnect.development);
