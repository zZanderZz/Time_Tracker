// Importando as dependências
const express = require('express');
const knex = require('knex');
const hbs = require('hbs');

// Configurando o servidor Express
const app = express();
app.set('view engine', 'hbs');

// Configurando o banco de dados usando o Knex
const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'seu_banco_de_dados',
  },
});

// Definindo as rotas
app.get('/', (req, res) => {
  // Lógica para renderizar a página inicial
  res.render('index', { title: 'Meu Software' });
});

app.get('/funcionarios', (req, res) => {
  // Lógica para obter os dados dos funcionários do banco de dados
  db('funcionarios')
    .select('*')
    .then((funcionarios) => {
      res.render('funcionarios', { funcionarios });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter os funcionários');
    });
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

app.get('/adicionar-funcionario', (req, res) => {
  // Renderiza a página para adicionar um novo funcionário
  res.render('adicionar-funcionario');
});

app.post('/adicionar-funcionario', (req, res) => {
  const { nome, cargo, salario } = req.body;

  // Lógica para adicionar um novo funcionário ao banco de dados
  db('funcionarios')
    .insert({ nome, cargo, salario })
    .then(() => {
      res.redirect('/funcionarios');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao adicionar o funcionário');
    });
});

app.get('/funcionarios/:id', (req, res) => {
  const { id } = req.params;

  // Lógica para obter os detalhes de um funcionário específico do banco de dados
  db('funcionarios')
    .where('id', id)
    .first()
    .then((funcionario) => {
      if (funcionario) {
        res.render('perfil-funcionario', { funcionario });
      } else {
        res.status(404).send('Funcionário não encontrado');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter os detalhes do funcionário');
    });
});

app.get('/funcionarios/:id/adicionar-atividade', (req, res) => {
  const { id } = req.params;

  // Renderiza a página para adicionar uma nova atividade para o funcionário
  res.render('adicionar-atividade', { idFuncionario: id });
});

app.post('/funcionarios/:id/adicionar-atividade', (req, res) => {
  const { id } = req.params;
  const { descricao, prazo } = req.body;

  // Lógica para adicionar uma nova atividade para o funcionário no banco de dados
  db('atividades')
    .insert({ descricao, prazo, idFuncionario: id })
    .then(() => {
      res.redirect(`/funcionarios/${id}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao adicionar a atividade');
    });
});

app.get('/funcionarios/:id/atividades', (req, res) => {
  const { id } = req.params;

  // Lógica para obter as atividades do funcionário específico do banco de dados
  db('atividades')
    .where('idFuncionario', id)
    .then((atividades) => {
      res.render('atividades-funcionario', { atividades });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter as atividades do funcionário');
    });
});

app.get('/admin', (req, res) => {
  // Lógica para obter os dados do administrador do banco de dados
  db('administrador')
    .first()
    .then((admin) => {
      res.render('perfil-admin', { admin });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter os detalhes do administrador');
    });
});

app.get('/admin/funcionarios', (req, res) => {
  // Lógica para obter todos os funcionários do banco de dados
  db('funcionarios')
    .then((funcionarios) => {
      res.render('lista-funcionarios', { funcionarios });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter a lista de funcionários');
    });
});

app.get('/admin/adicionar-funcionario', (req, res) => {
  // Renderiza a página para adicionar um novo funcionário
  res.render('adicionar-funcionario');
});

app.post('/admin/adicionar-funcionario', (req, res) => {
  const { nome, cargo, salario, idSetor, idTurno } = req.body;

  // Lógica para adicionar um novo funcionário ao banco de dados
  db('funcionarios')
    .insert({ nome, cargo, salario, idSetor, idTurno })
    .then(() => {
      res.redirect('/admin/funcionarios');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao adicionar um novo funcionário');
    });
});

app.get('/admin/funcionarios/:id/editar', (req, res) => {
  const { id } = req.params;

  // Lógica para obter os dados do funcionário do banco de dados
  db('funcionarios')
    .where('id', id)
    .first()
    .then((funcionario) => {
      res.render('editar-funcionario', { funcionario });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter os detalhes do funcionário');
    });
});

app.post('/admin/funcionarios/:id/editar', (req, res) => {
  const { id } = req.params;
  const { nome, cargo, salario, idSetor, idTurno } = req.body;

  // Lógica para atualizar os dados do funcionário no banco de dados
  db('funcionarios')
    .where('id', id)
    .update({ nome, cargo, salario, idSetor, idTurno })
    .then(() => {
      res.redirect('/admin/funcionarios');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao atualizar os detalhes do funcionário');
    });
});

app.post('/admin/funcionarios/:id/excluir', (req, res) => {
  const { id } = req.params;

  // Lógica para excluir o funcionário do banco de dados
  db('funcionarios')
    .where('id', id)
    .del()
    .then(() => {
      res.redirect('/admin/funcionarios');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao excluir o funcionário');
    });
});

app.get('/admin/relatorios', (req, res) => {
  // Lógica para obter os dados dos funcionários e gerar os relatórios de desempenho
  db('funcionarios')
    .select('id', 'nome', 'pontuacao')
    .orderBy('pontuacao', 'desc')
    .then((funcionarios) => {
      res.render('relatorios', { funcionarios });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao gerar os relatórios');
    });
});
// Middleware de autenticação
function verificaAutenticacao(req, res, next) {
  if (req.session && req.session.usuario) {
    // Usuário autenticado
    return next();
  } else {
    // Redirecionar para a página de login
    res.redirect('/login');
  }
}

// Rota de login
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Lógica para autenticar o usuário
  if (usuario === 'admin' && senha === 'senha123') {
    req.session.usuario = usuario;
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});

// Rota do painel administrativo
app.get('/admin', verificaAutenticacao, (req, res) => {
  // Lógica para exibir o painel administrativo
  res.render('admin');
});

app.get('/admin/setores', verificaAutenticacao, (req, res) => {
  // Lógica para obter os setores do banco de dados
  db('setores')
    .select('*')
    .then((setores) => {
      res.render('setores', { setores });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter os setores');
    });
});

// Rota para adicionar um novo setor
app.post('/admin/setores', verificaAutenticacao, (req, res) => {
  const { nome } = req.body;

  // Lógica para adicionar o novo setor ao banco de dados
  db('setores')
    .insert({ nome })
    .then(() => {
      res.redirect('/admin/setores');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao adicionar o setor');
    });
});

// Rota para excluir um setor
app.post('/admin/setores/:id/excluir', verificaAutenticacao, (req, res) => {
  const { id } = req.params;

  // Lógica para excluir o setor do banco de dados
  db('setores')
    .where('id', id)
    .del()
    .then(() => {
      res.redirect('/admin/setores');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao excluir o setor');
    });
});

// Rota para exibir a lista de funcionários
app.get('/admin/funcionarios', verificaAutenticacao, (req, res) => {
  // Lógica para obter os funcionários do banco de dados
  db('funcionarios')
    .select('*')
    .then((funcionarios) => {
      res.render('funcionarios', { funcionarios });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter os funcionários');
    });
});

// Rota para exibir o formulário de atribuição de tarefas
app.get('/admin/atribuir-tarefa', verificaAutenticacao, (req, res) => {
  // Lógica para obter os setores e funcionários do banco de dados
  Promise.all([
    db('setores').select('*'),
    db('funcionarios').select('*'),
  ])
    .then(([setores, funcionarios]) => {
      res.render('atribuir-tarefa', { setores, funcionarios });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter os setores e funcionários');
    });
});

// Rota para processar o formulário de atribuição de tarefas
app.post('/admin/atribuir-tarefa', verificaAutenticacao, (req, res) => {
  const { funcionarioId, tarefa } = req.body;

  // Lógica para atribuir a tarefa ao funcionário no banco de dados
  db('funcionarios')
    .where('id', funcionarioId)
    .update({ tarefa })
    .then(() => {
      res.redirect('/admin/funcionarios');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao atribuir a tarefa');
    });
});

// Rota para exibir as conclusões dos funcionários
app.get('/admin/conclusoes', verificaAutenticacao, (req, res) => {
  // Lógica para obter as conclusões dos funcionários do banco de dados
  db('conclusoes')
    .select('*')
    .then((conclusoes) => {
      res.render('conclusoes', { conclusoes });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter as conclusões');
    });
});

// Rota para exibir a conclusão de um funcionário específico
app.get('/admin/conclusoes/:id', verificaAutenticacao, (req, res) => {
  const funcionarioId = req.params.id;

  // Lógica para obter a conclusão do funcionário no banco de dados
  db('conclusoes')
    .where('funcionario_id', funcionarioId)
    .first()
    .then((conclusao) => {
      res.render('conclusao', { conclusao });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter a conclusão do funcionário');
    });
});
app.get('/funcionario/avisos', verificaAutenticacao, (req, res) => {
  const funcionarioId = req.session.funcionarioId;

  // Lógica para obter os avisos de atrasos do funcionário no banco de dados
  db('avisos')
    .where('funcionario_id', funcionarioId)
    .select('*')
    .then((avisos) => {
      res.render('avisos', { avisos });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter os avisos de atrasos');
    });
});

app.get('/admin/promocoes', verificaAutenticacao, (req, res) => {
  // Lógica para obter as promoções dos funcionários do banco de dados
  db('promocoes')
    .select('*')
    .then((promocoes) => {
      res.render('promocoes', { promocoes });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter as promoções');
    });
});

// Rota para adicionar uma nova tarefa
app.post('/admin/tarefas', verificaAutenticacao, (req, res) => {
  const { descricao, prazo, funcionarioId } = req.body;

  // Lógica para adicionar a tarefa no banco de dados
  db('tarefas')
    .insert({ descricao, prazo, funcionario_id: funcionarioId })
    .then(() => {
      res.redirect('/admin/tarefas');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao adicionar a tarefa');
    });
});
// Rota para exibir as conclusões das atividades
app.get('/admin/conclusoes', verificaAutenticacao, (req, res) => {
  // Lógica para obter as conclusões das atividades do banco de dados
  db('conclusoes')
    .select('*')
    .then((conclusoes) => {
      res.render('conclusoes', { conclusoes });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter as conclusões');
    });
});

// Rota para criar um novo funcionário
app.post('/admin/funcionarios', verificaAutenticacao, (req, res) => {
  const { nome, dataNascimento, cargo, salario, setorId, turnoId } = req.body;

  // Lógica para adicionar o novo funcionário no banco de dados
  db('funcionarios')
    .insert({ nome, data_nascimento: dataNascimento, cargo, salario, setor_id: setorId, turno_id: turnoId })
    .then(() => {
      res.redirect('/admin/funcionarios');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao adicionar o novo funcionário');
    });
});
// Rota para exibir o perfil do funcionário
app.get('/funcionario/perfil', verificaAutenticacao, (req, res) => {
  const funcionarioId = req.session.usuarioId;

  // Lógica para obter as informações do perfil do funcionário do banco de dados
  db('funcionarios')
    .select('*')
    .where({ id: funcionarioId })
    .first()
    .then((funcionario) => {
      res.render('perfil', { funcionario });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter as informações do perfil');
    });
});
// Rota para registrar a conta de um novo funcionário
app.post('/admin/funcionarios/registrar-conta', verificaAutenticacao, (req, res) => {
  const { funcionarioId, username, senha } = req.body;

  // Lógica para registrar a conta do funcionário no banco de dados
  db('contas_funcionarios')
    .insert({ funcionario_id: funcionarioId, username, senha })
    .then(() => {
      res.redirect('/admin/funcionarios');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao registrar a conta do funcionário');
    });
});
// Rota para exibir as conclusões de atividades
app.get('/admin/conclusoes', verificaAutenticacao, (req, res) => {
  // Lógica para obter as conclusões de atividades do banco de dados
  db('conclusoes_atividades')
    .select('*')
    .then((conclusoes) => {
      res.render('conclusoes', { conclusoes });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter as conclusões de atividades');
    });
});
// Rota para enviar avisos de atrasos aos funcionários
app.post('/admin/funcionarios/:id/avisos-atraso', verificaAutenticacao, (req, res) => {
  const funcionarioId = req.params.id;
  const { motivo } = req.body;

  // Lógica para enviar o aviso de atraso ao funcionário
  const aviso = {
    funcionarioId,
    motivo,
    data: new Date(),
  };

  db('avisos_atraso')
    .insert(aviso)
    .then(() => {
      res.redirect(`/admin/funcionarios/${funcionarioId}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao enviar o aviso de atraso');
    });
});
// Rota para exibir as promoções recebidas pelos funcionários
app.get('/admin/promocoes', verificaAutenticacao, (req, res) => {
  // Lógica para obter as promoções recebidas pelos funcionários do banco de dados
  db('promocoes')
    .select('*')
    .then((promocoes) => {
      res.render('promocoes', { promocoes });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter as promoções');
    });
});
// Rota para registrar uma nova conta de funcionário
app.post('/admin/funcionarios', verificaAutenticacao, (req, res) => {
  const { nome, email, senha } = req.body;

  // Lógica para registrar uma nova conta de funcionário no banco de dados
  const funcionario = {
    nome,
    email,
    senha,
  };

  db('funcionarios')
    .insert(funcionario)
    .then(() => {
      res.redirect('/admin/funcionarios');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao registrar uma nova conta de funcionário');
    });
});

// Rota para registrar uma nova conta de administrador
app.post('/admin/administradores', verificaAutenticacao, (req, res) => {
  const { nome, email, senha } = req.body;

  // Lógica para registrar uma nova conta de administrador no banco de dados
  const administrador = {
    nome,
    email,
    senha,
  };

  db('administradores')
    .insert(administrador)
    .then(() => {
      res.redirect('/admin/administradores');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao registrar uma nova conta de administrador');
    });
});
// Rota para exibir os dados do perfil do funcionário
app.get('/funcionarios/:id', verificaAutenticacao, (req, res) => {
  const funcionarioId = req.params.id;

  // Lógica para obter os dados do perfil do funcionário do banco de dados
  db('funcionarios')
    .select('*')
    .where({ id: funcionarioId })
    .first()
    .then((funcionario) => {
      res.render('perfil_funcionario', { funcionario });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erro ao obter os dados do perfil do funcionário');
    });
});
// Rota para enviar o arquivo anexado à atividade concluída
app.post('/funcionarios/:id/atividades/:atividadeId/anexos', verificaAutenticacao, upload.single('arquivo'), (req, res) => {
  const funcionarioId = req.params.id;
  const atividadeId = req.params.atividadeId;
  const arquivo = req.file;

  // Lógica para salvar o arquivo anexado no banco de dados ou em algum serviço de armazenamento

  // Redirecionar para a página de atividades do funcionário
  res.redirect(`/funcionarios/${funcionarioId}/atividades`);
});

// Rota para exibir os avisos de atrasos dos funcionários
app.get('/funcionarios/:id/avisos-atrasos', verificaAutenticacao, (req, res) => {
    const funcionarioId = req.params.id;
  
    // Lógica para obter os avisos de atrasos do funcionário do banco de dados
    db('avisos')
      .select('*')
      .where({ funcionarioId })
      .then((avisos) => {
        res.render('avisos_atrasos', { avisos });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Erro ao obter os avisos de atrasos dos funcionários');
      });
  });
  // Rota para exibir as promoções dos funcionários
app.get('/funcionarios/:id/promocoes', verificaAutenticacao, (req, res) => {
    const funcionarioId = req.params.id;
  
    // Lógica para obter as promoções do funcionário do banco de dados
    db('promocoes')
      .select('*')
      .where({ funcionarioId })
      .then((promocoes) => {
        res.render('promocoes', { promocoes });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Erro ao obter as promoções dos funcionários');
      });
  });