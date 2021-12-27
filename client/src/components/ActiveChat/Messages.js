import React, { useEffect, useState, useCallback } from "react";
import { Box, Avatar } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [finalReadMessage, setFinalReadMessage] = useState(-1) 

  const findFinalReadMessage = useCallback(() => {
    const finalRead = messages.reduce((finalRead, message) => {
      if (message.senderId === userId && message.otherUserRead) finalRead = message.id
      return finalRead
    }, -1)
    if (finalRead) setFinalReadMessage(finalRead)
  }, [messages, userId])

  useEffect(() => {
    if (messages.length === 0) return
    findFinalReadMessage()
  }, [messages, findFinalReadMessage])

  const printMessages = () =>
    messages.map((message) => {
      const time = moment(message.createdAt).format('h:mm')

      return message.senderId === userId ? (
        <SenderBubble
          key={message.id}
          text={message.text}
          time={time}
          otherUser={otherUser}
          markedRead={message.id === finalReadMessage}
        />
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
