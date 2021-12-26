import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const sortByDate = () => messages.sort((a, b) => moment(a.createdAt) - moment(b.createdAt));
  
  const printMessages = () =>
    sortByDate().map((message) => {
      const time = moment(message.createdAt).format('h:mm')

      return message.senderId === userId ? (
        <SenderBubble key={message.id} text={message.text} time={time} />
      ) : (
        <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
      )
    });

  return (
    <Box>
      {printMessages()}
    </Box>
  );
};

export default Messages;
