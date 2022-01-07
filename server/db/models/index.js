const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UsersToConversations = require("./usersToConversations")
// associations

User.hasMany(UsersToConversations)
Conversation.hasMany(UsersToConversations)
UsersToConversations.belongsTo(User, { as: "userId "})
UsersToConversations.belongsTo(Conversation, { as: "conversationId" })

UsersToConversations.hasOne(Message, { as: "readId" })

Message.belongsTo(Conversation);
Conversation.hasMany(Message);



module.exports = {
  User,
  Conversation,
  Message
};
