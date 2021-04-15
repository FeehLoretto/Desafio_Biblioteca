const db = require ('../models');

Livro = db.livros;
Locatorio = db.locatorios;
const Ops = db.sequelize.Op; 

exports.createLivro = (req,res) => {
    if(!req.body.nome){
        res.status(400).send({message: "Nome não pode ser vazio."})

        return;
    }
    const livro = {
        nome: req.body.nome,
        autor: req.body.autor,
        sinopse: req.body.sinopse,
        dataLacamento: req.body.dataLacamento,
        dataAluguel: req.body.dataAluguel,
        status: req.body.status ? req.body.status : true 
    }
    Livro.create(livro)
    .then((data) => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Erro interno ao cadastrar o livro'
        });
    });
};

exports.createLocatorio = (req, res) => {
    if(!req.body.nome) {
        res.status(400).send({message: 'Nome não pode ser vazio'})
        return;
    }
    
    const locatorio = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        statusCadastro: req.body.statusCadastro ? req.body.statusCadastro: true
    };
    
    Locatorio.create(locatorio)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({message: "Erro interno ao tentar cadastrar locatório."})
    })
};

exports.findAll = (req,res) => {
    Livro.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar os livros"
        });
    });
}; 

exports.findAllLocatorios = (req,res) => {
    Locatorio.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar os locatórios"
        });
    });
}; 

exports.findByAutor = (req, res) => {
    const autor = req.params.autor;
    Livro.findAll({where: {autor: autor}})
    .then(data => {
        if(!data){
            res.status(404).send({ message: "Autor não encontrado."})
        }
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || `Erro interno ao buscar os livros do(a) autor(a) ${autor}.`
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Livro.update(req.body, {where: {id:id}})
    .then(num => {
        if (num ==1) {
            res.send({message: "Status do livro atualizado"})
        } else {
            res.send({message:`Não foi possível atualizar o status do livro de id ${id}, livro não encontrado.`})
        }
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || `Erro interno ao tentar atualizar o livro de id ${id}`
        });
    });
};

exports.findAtivos = (req,res) => {
    Locatorio.findAll({where:{statusCadastro : true}})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({message: 'Erro interno ao tentar achar os locatórios ativos.'})
    })
};

exports.deleteAllLivros = (req, res) => {
    Livro.destroy({where: {},
    truncate: false})
    .then(nums => {
        res.send({message:`${nums} livros deletados com sucesso.`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || `Erro interno ao tentar apagar os livros.`
        })
    })
}

exports.deleteAllLocatorios = (req, res) => {
    Locatorio.destroy({where: {},
    truncate: false})
    .then(nums => {
        res.send({message:`${nums} locatórios deletados com sucesso.`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || `Erro interno ao tentar apagar os locatórios.`
        })
    })
}

exports.deleteLivro = (req, res) => {
    const id = req.params.id;
    Livro.destroy({where: {id:id}})
    .then(num => {
        if (num ==1) {
            res.send({message: "Livro apagado"})
        } else {
            res.send({message:`Não foi possível apagar o livro de id ${id}, livro não encontrado.`})
        }
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || `Erro interno ao tentar atualizar o livro de id ${id}.`
        });
    });
};

exports.deleteLocatorio = (req, res) => {
    const id = req.params.id;
    Locatorio.destroy({where: {id:id}})
    .then(num => {
        if (num ==1) {
            res.send({message: "Locatórios apagado"})
        } else {
            res.send({message:`Não foi possível apagar o locatório de id ${id}, locatório não encontrado.`})
        }
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || `Erro interno ao tentar atualizar o locatório de id ${id}.`
        });
    });
};