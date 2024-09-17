const User = require('../models/User')

// envia a senha para o banco com HASH, nunca ela crua
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        
        const { name, email, password, confirmpassword } = req.body

        // password match validation
        if(password != confirmpassword) {
            // mensagem pro front
            req.flash('message', 'As senhas digitadas estão diferentes, tente novamente!')
            res.render('auth/register')

            return
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({
            where: {email: email}
        })

        if (checkIfUserExists) {
            // mensagem pro front
            req.flash('message', 'Já existe um usuário cadastrado com este email, tente outro!')
            res.render('auth/register')

            return
        }

        // create a password
        const salt = bcrypt.genSaltSync(10) // 10 caracteres randomicos para complicar a senha
        const hashedPassword = bcrypt.hashSync(password, salt)

        // cria um obj de usuário com os dados que veio
        const user = {
            name,
            email,
            password: hashedPassword // manda a senha criptografada
        }

        try {
            const createdUser = await User.create(user)

            // quando criarmos um usuário ja vamos autentica-lo
            // inicializa a sessão
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch(err) {
            console.log(err)
        }
    }
}