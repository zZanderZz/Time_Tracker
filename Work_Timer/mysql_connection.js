const knex = require("knex");

module.exports = knex({
    client: "mysql",
    connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "EMPRESA",
    },
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
});