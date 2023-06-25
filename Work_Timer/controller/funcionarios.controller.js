const funcionariosRepository = require("../repository/funcionarios.repository");

module.exports = {
    buscaTodos: async(req, res) => {
        const data = await funcionariosRepository
            .buscaTodos()
            .then((result) => result)
            .catch((error) => {
                res.status(500).send(error);
            });
        res.render("funcionario", { data });
    },
    buscaPorId: async(req, res) => {
        const { id } = req.params;

        let data = await funcionariosRepository.buscaPorId(id);

        data = data[0];

        data.DATA_NSC = formataData(data.DATA_NSC);

        res.render("cadastro_funcionario", { data });
    },
    inserir: async(req, res) => {
        var funcionario = req.body;

        // if ternario para validar o status retornado do formulario cadastro_funcionario.hbs
        funcionario.STATUS = funcionario.STATUS == "on";
        funcionario.CPF = funcionario.CPF.replaceAll(".", "").replaceAll("-", "");

        if (funcionario.ID == "") {
            funcionario.ID = null;
            await funcionariosRepository.inserir(funcionario);
        } else {
            const { ID } = funcionario;
            await funcionariosRepository.atualizar(funcionario, ID);
        }

        res.redirect("funcionarios");
    },
    deletar: (req, res) => {
        const { id } = req.params;

        funcionariosRepository
            .deletar(id)
            .then(() => {
                res.send({ msg: "Funcionario deletado com sucesso!" });
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    },
    atualizar: (req, res) => {
        const funcionario = req.body;
        const { id } = req.params;

        funcionariosRepository
            .atualizar(funcionario, id)
            .then(() => {
                res.send({
                    msg: "Funcionario atualizado com sucesso!",
                    funcionario,
                });
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    },
    buscaTodosDepDoFunc: async(req, res) => {
        const data = await funcionariosRepository
            .buscaTodosDepDoFunc()
            .then((data) => data);

        res.render("dependentes", { data });
    },
    buscaDepDoFunc: (req, res) => {
        const { id } = req.params;
        funcionariosRepository
            .buscaDepDoFunc(id)
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    },
    inserirDependentes: async(req, res) => {
        const dependente = req.body;

        const funcionario = await funcionariosRepository
            .buscaPorId(dependente.funcionario_id)
            .then((data) => data)
            .catch((error) => {
                return res.status(500).send(error);
            });

        if (funcionario.length <= 0) {
            return res.status(404).send({ msg: "Funcionario não existe!" });
        }

        funcionariosRepository
            .inserirDependentes(dependente)
            .then((data) => {
                return res.send({ msg: "Dependente registrado com sucesso!" });
            })
            .catch((error) => {
                return res.status(500).send(error);
            });
    },
};

function formataData(end_date) {
    var ed = new Date(end_date);
    var d = ed.getDay();
    var m = ed.getMonth() + 1;
    var y = ed.getFullYear();
    return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}