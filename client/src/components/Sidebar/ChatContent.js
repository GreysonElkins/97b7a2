import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: (props) => (props.isUnread ? '' : '#9CADC8'),
    letterSpacing: -0.17,
    fontWeight: (props) => (props.isUnread ? 'bold' : ''),

  },
}))

const ChatContent = (props) => {
  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const styleProps = {
    isUnread: conversation.unread?.newReceivedCount > 0,
  };

  const classes = useStyles(styleProps);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>{otherUser.username}</Typography>
        <Typography
          className={classes.previewText}
          isUnread={conversation.unread?.newReceivedCount > 0}
        >
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  )
};

export default ChatContent;
