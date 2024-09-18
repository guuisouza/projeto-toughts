const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ThoughtController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async dashboard(req, res) {
        res.render('toughts/dashboard')
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
}