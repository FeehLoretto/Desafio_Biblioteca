module.exports = (sequelize, Sequelize) => {
    const Locatorio = sequelize.define("locatorio",{
        nome: {
            type: Sequelize.STRING
        },
        cpf: {
            type: Sequelize.STRING
        },
        statusCadastro: {
            type: Sequelize.BOOLEAN
        }
    })
    return Locatorio;
}