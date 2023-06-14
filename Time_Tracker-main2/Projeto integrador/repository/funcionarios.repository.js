const con = require("../mysql-connection");
const knex = require('knex');
const knexfile = require('../knexfile');

const db = knex(knexfile.development);

async function findByNome(nome) {
    return db('funcionarios').where({ nome }).first();
}
module.exports = {
    buscaTodos: () => {
        return con.select().from("funcionarios").orderByRaw("id desc");
    },
    buscaPorId: (id) => {
        return con.select().from("funcionarios").where("id", "=", id);
    },
    inserir: (funcionario) => {
        return con.insert(funcionario).into("funcionarios");
    },
    deletar: (id) => {
        return con("funcionarios").where({ id: id }).del();
    },
    atualizar: (funcionario, id) => {
        return con("funcionarios").update(funcionario).where({ id: id });
    },

};