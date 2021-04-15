const express = require ('express');
const db = require('./app/models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extented: true}));

app.get('/',(req,res)=>{
    res.json({mensagem: "Avanade Crud"});
});

db.sequelize.sync();

require('./app/routes/biblioteca')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});