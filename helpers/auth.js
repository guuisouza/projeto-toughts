// nesse arquivo ficará funções que irão nos ajudar em algo
const checkAuth = function (req, res, next) {

    // middleware que verifica se o usuário está logado
    // serve para proteger rotas que precisam de autenticação para serem acessadas

    const userId = req.session.userid

    if(!userId) {
        return res.redirect('/login')
    }

    next()
}

module.exports = checkAuth