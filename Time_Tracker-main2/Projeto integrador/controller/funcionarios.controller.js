const funcionariosRepository = require("../repository/funcionarios.repository");

module.exports = {
    buscaTodos: async(req, res) => {
        const data = await funcionariosRepository
            .buscaTodos()
            .then((result) => result)
            .catch((error) => {
                res.status(500).send(error);
            });
        res.render("funcionarios", { data });
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

    login: (req, res) => {
        const { usuario, senha } = req.body;
        try {
            const funcionario = await FuncionarioRepository.findByNome(usuario);
            if (funcionario && funcionario.cpf === senha) {
                res.json({ loginSucesso: true });
            } else {
                res.json({ loginSucesso: false });
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
};

function formataData(end_date) {
    var ed = new Date(end_date);
    var d = ed.getDay();
    var m = ed.getMonth() + 1;
    var y = ed.getFullYear();
    return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}