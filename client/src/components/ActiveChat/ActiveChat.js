import React, { useState, useEffect, useMemo, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { readMessages } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = useMemo(() => props.conversation || {}, [props.conversation]);
  const readMessages = useMemo(() => props.readMessages || {}, [props.readMessages]);
  const [error, setError] = useState(false)

  const markReadMessages = useCallback(async () => {
    try {
      const res = await readMessages(conversation.unread.messages, conversation.id)
      if (!res) setError(true)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (!conversation || !conversation.unread || conversation.unread.messages.length === 0 || error) return
    markReadMessages()
  }, [conversation, error, markReadMessages, readMessages])

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              latestRead={conversation.unread?.latestSentRead}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readMessages: (messageIds, conversationId) => {
      dispatch(readMessages(messageIds, conversationId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
