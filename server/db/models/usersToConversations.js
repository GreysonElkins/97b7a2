const Sequelize = require('sequelize')
const db = require('../db')

const UsersToConversations = db.define('usersToConversations', {
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  readId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
})

module.exports = UsersToConversations
