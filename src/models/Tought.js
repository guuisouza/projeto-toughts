const { DataTypes } = require('sequelize')

const db = require('../db/connection')

// user
const User = require('./User')

const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

Tought.belongsTo(User) // um pensamento pertence a um user
User.hasMany(Tought) // um usuário tem muitos pensamentos

module.exports = Tought