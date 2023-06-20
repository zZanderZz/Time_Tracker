const knex = require("knex");

module.exports = knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: 3309,
        user: "root",
        password: "",
        database: "empresa",
    },
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
});