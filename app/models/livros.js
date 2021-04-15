module.exports = (sequelize,Sequelize) => {
const Livro = sequelize.define("livro",{
    nome: {
        type: Sequelize.STRING
    },
    autor: {
        type: Sequelize.STRING
    },
    sinopse: {
        type: Sequelize.STRING
    }, 
    dataLacamento: {
        type: Sequelize.DATE
    },
    dataAluguel: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.BOOLEAN
    }
});

return Livro;
};
