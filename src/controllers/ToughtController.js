const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ThoughtController {
    static async showToughts(req, res) {

        let search = '' // altera o valor se veio algo na busca

        if(req.query.search) {
            search = req.query.search // adiciona em search o que veio na query de search (url)
        }

        // definindo ORDEM da busca       
        let order = 'DESC'

        if(req.query.order === 'old') { // este order vem do input de cada form que tem os botoes de ordenar
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        // exibe todos os pensamentos de todos
        const toughtsData = await Tought.findAll({
            // traz junto o user de cada pensamento
            include: User,
            where: {
                // filtra o titulo para que contenha o que vem em search
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]] // ordena por data de criacao, usando a ordem de busca que definimos
        })

        // usuario e pensamento é jogado no mesmo array
        const toughts = toughtsData.map((tought) => tought.get({ plain: true }))

        // exibe quantos pensamentos vieram com aquela busca
        let toughtsQty = toughts.length
        if(toughtsQty === 0) {
            toughtsQty = false
        }
        res.render('toughts/home', { toughts, search, toughtsQty })
    }

    static async dashboard(req, res) {

        const userId = req.session.userid // pega o id do usuário pela sessão

        // verifica se o usuario existe -> boa prática
        const user = await User.findOne({
            where: {id: userId},
            include: Tought, // tras todos os dados associados ao usuario na tabela de toughts
            plain: true
        })

        // se nao veio nenhum dado do usuário então ele não existe
        if (!user) {
            res.redirect('/login')
        }

        // manipulação para trazer só as tarefas, será feito um loop no handlebars para exibilas
        const toughts = user.Toughts.map((tought) => tought.dataValues)

        /*[
            {
              id: 1,
              title: 'Meu primeiro pensamento!',
              createdAt: 2024-09-18T19:53:07.000Z,
              updatedAt: 2024-09-18T19:53:07.000Z,
              UserId: 3
            }
        ]*/

        // implementa uma lógica para exibir uma mensagem caso nao tenha pensamentos
        let emptyToughts = false

        if(toughts.length === 0) {
            emptyToughts = true
        }

        res.render('toughts/dashboard', { toughts, emptyToughts })
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {

        const tought = {
            title: req.body.title,
            UserId: req.session.userid // pega da própria sessão o id do usuário
        }

        try {
            
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso')

            // salva a sessão
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch(err) {
            console.log(err)
        }
    }

    static async removeTought(req, res) {

        const toughtId = req.body.id
        const userId = req.session.userid
        
        try {

            await Tought.destroy({
                where: {id: toughtId, UserId: userId} // filtro duplo
            })
    
            req.flash('message', 'Pensamento excluido com sucesso')

            // salva a sessão
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch(err) {
            console.log(err)
        }
    }

    static async updateTought(req, res) {

        const toughtId = req.params.id
        
        const tought = await Tought.findOne({ where: {id: toughtId}, raw: true })

        res.render('toughts/edit', { tought })
    }

    static async updateToughtPost(req, res) {

        const id = req.body.id

        const updatedTought = {
            title: req.body.title
        }

        try {
            await Tought.update(updatedTought, {where: {id: id}})
            req.flash('message', 'Pensamento atualizado com sucesso')

            // salva a sessão
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch(err) {
            console.log(err)
        }
    }
}