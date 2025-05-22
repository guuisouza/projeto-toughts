const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
  async register({ name, email, password, confirmpassword }) {
    if (password !== confirmpassword) {
      throw new Error('As senhas digitadas estão diferentes, tente novamente!')
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      throw new Error('Já existe um usuário cadastrado com este email, tente outro!')
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return newUser
  },

  async login({ email, password }) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw new Error('Email não encontrado')
    }

    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      throw new Error('Senha inválida')
    }

    return user
  }
}
