const AuthService = require('../services/AuthService')

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login')
  }

  static register(req, res) {
    res.render('auth/register')
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body

    try {
      const newUser = await AuthService.register({ name, email, password, confirmpassword })
      req.session.userid = newUser.id
      req.flash('message', 'Cadastro realizado com sucesso!')
      req.session.save(() => res.redirect('/'))
    } catch (err) {
      req.flash('message', err.message)
      res.render('auth/register')
    }
  }

  static async loginPost(req, res) {
    const { email, password } = req.body

    try {
      const user = await AuthService.login({ email, password })
      req.session.userid = user.id
      req.flash('message', 'Autenticação realizada com sucesso!')
      req.session.save(() => res.redirect('/'))
    } catch (err) {
      req.flash('message', err.message)
      res.render('auth/login')
    }
  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  }
}
