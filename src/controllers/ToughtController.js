const ToughtService = require('../services/ToughtService')

module.exports = class ThoughtController {
  static async showToughts(req, res) {
    const search = req.query.search || ''
    const order = req.query.order === 'old' ? 'ASC' : 'DESC'

    const toughts = await ToughtService.getAllToughts({ search, order })
    const toughtsQty = toughts.length > 0 ? toughts.length : false

    res.render('toughts/home', { toughts, search, toughtsQty })
  }

  static async dashboard(req, res) {
    const userId = req.session.userid
    const toughts = await ToughtService.getUserToughts(userId)

    if (!toughts) {
      return res.redirect('/login')
    }

    const emptyToughts = toughts.length === 0

    res.render('toughts/dashboard', { toughts, emptyToughts })
  }

  static createTought(req, res) {
    res.render('toughts/create')
  }

  static async createToughtSave(req, res) {
    try {
      await ToughtService.createTought({
        title: req.body.title,
        userId: req.session.userid,
      })

      req.flash('message', 'Pensamento criado com sucesso')
      req.session.save(() => res.redirect('/toughts/dashboard'))
    } catch (err) {
      console.log(err)
    }
  }

  static async removeTought(req, res) {
    try {
      await ToughtService.removeTought({
        toughtId: req.body.id,
        userId: req.session.userid,
      })

      req.flash('message', 'Pensamento excluido com sucesso')
      req.session.save(() => res.redirect('/toughts/dashboard'))
    } catch (err) {
      console.log(err)
    }
  }

  static async updateTought(req, res) {
    const tought = await ToughtService.findToughtById(req.params.id)
    res.render('toughts/edit', { tought })
  }

  static async updateToughtPost(req, res) {
    try {
      await ToughtService.updateTought(req.body.id, req.body.title)

      req.flash('message', 'Pensamento atualizado com sucesso')
      req.session.save(() => res.redirect('/toughts/dashboard'))
    } catch (err) {
      console.log(err)
    }
  }
}
