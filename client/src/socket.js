import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  countNewMessage,
  setLatestReadMessage
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
    store.dispatch(countNewMessage(data.recipientId, data.message.conversationId))
  });
  socket.on("message-read", (data) => {
    store.dispatch(setLatestReadMessage(data.conversationId, data.messageId))
  })
});

export default socket;
