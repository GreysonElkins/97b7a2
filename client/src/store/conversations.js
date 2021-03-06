import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  countNewMessageInStore,
  setReadMessagesInStore,
  setLatestReadMessageInStore,
} from './utils/reducerFunctions';
import moment from "moment";
// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const COUNT_NEW_MESSAGE = "COUNT_NEW_MESSAGE";
const SET_READ_MESSAGES = "SET_READ_MESSAGES";
const SET_LATEST_READ = "SET_LATEST_READ";

// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
     conversations: conversations.map((convo) => {
      const convoCopy = { ...convo };
      convoCopy.messages = convo.messages.sort((a, b) => moment(a.createdAt) - moment(b.createdAt));
      return convoCopy;
    }),
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const countNewMessage = (recipientId, message) => {
  return {
    type: COUNT_NEW_MESSAGE,
    recipientId,
    message
  }
}

export const setReadMessages = (messageIds, conversationId) => {
  return {
    type: SET_READ_MESSAGES,
    readCount: messageIds.length,
    conversationId: conversationId
  }
}

export const setLatestReadMessage = (conversationId, messageId) => {
  return {
    type: SET_LATEST_READ,
    conversationId,
    messageId
  }
}

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case COUNT_NEW_MESSAGE:
      return countNewMessageInStore(
        state, 
        action.recipientId, 
        action.message
      );
    case SET_READ_MESSAGES: 
      return setReadMessagesInStore(
        state,
        action.readCount,
        action.conversationId
      )
    case SET_LATEST_READ: 
      return setLatestReadMessageInStore(
        state,
        action.conversationId,
        action.messageId
      )
    default:
      return state;
  }
};

export default reducer;
