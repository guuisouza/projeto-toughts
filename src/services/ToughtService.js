const Tought = require('../models/Tought')
const User = require('../models/User')
const { Op } = require('sequelize')

module.exports = {
  async getAllToughts({ search = '', order = 'DESC' }) {
    const toughtsData = await Tought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [['createdAt', order]],
    })

    return toughtsData.map(tought => tought.get({ plain: true }))
  },

  async getUserToughts(userId) {
    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    })

    if (!user) {
      return null
    }

    return user.Toughts.map(t => t.dataValues)
  },

  async createTought({ title, userId }) {
    return await Tought.create({
      title,
      UserId: userId,
    })
  },

  async removeTought({ toughtId, userId }) {
    return await Tought.destroy({
      where: {
        id: toughtId,
        UserId: userId,
      },
    })
  },

  async findToughtById(id) {
    return await Tought.findOne({
      where: { id },
      raw: true,
    })
  },

  async updateTought(id, title) {
    return await Tought.update({ title }, {
      where: { id },
    })
  },
}
