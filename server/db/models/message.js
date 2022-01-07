const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define('message', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
})

module.exports = Message;
