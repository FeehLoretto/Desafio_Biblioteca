module.exports = app => {
    const locatorios = require ('../controllers/biblioteca');
    const livros = require ('../controllers/biblioteca');
    var router = require ('express').Router();

    router.post('/cadastro_livro',livros.createLivro);
    router.post('/cadastro_locatorio', locatorios.createLocatorio);

    router.get('/livros',livros.findAll);
    router.get('/buscar/:autor',livros.findByAutor);
    router.get('/locatorios_ativos',locatorios.findAtivos); 
    router.get('/locatorios',locatorios.findAllLocatorios);

    router.put('/atualizar_livro/:id',livros.update);
    
    router.delete('/apagar_livros',livros.deleteAllLivros);
    router.delete('/apagar_locatorios',locatorios.deleteAllLocatorios);   
    router.delete('/apagar_livro/:id',livros.deleteLivro);
    router.delete('/apagar_locatorio/:id',locatorios.deleteLocatorio);
    
    app.use('/biblioteca', router);
}