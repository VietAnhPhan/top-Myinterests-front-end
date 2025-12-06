import { useContext } from "react";
import { UserContext } from "../../../Context";
import Avatar from "../../Avatar/Avatar";
import styles from "./Conversation.module.css";

const Conversation = ({ conversation }) => {
  const userContext = useContext(UserContext);
  const chatUser = getChatUser(conversation.Participant, userContext.id);
  const isSeen = getLastMessage(conversation).isSeen;
  const chatUserId = getLastMessage(conversation).userId;

  const lastTime = new Date(getLastMessage(conversation).createdAt);
  const lastTimeFortmat =
    lastTime.getMonth() +
    1 +
    "/" +
    lastTime.getDate() +
    "/" +
    lastTime.getFullYear();

  async function handleSelect() {
    userContext.handleSelectUser(chatUser, conversation);

    if (
      !userContext.screen.isChatWindow ||
      !userContext.screen.isConversationList
    ) {
      userContext.screen.setIsChatWindow(true);
      userContext.screen.setIsConversationList(false);
    }
  }

  return (
    <div
      className="p-4 hover:bg-zinc-200/50 dark:hover:bg-slate-800"
      onClick={handleSelect}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-x-3">
          <Avatar user={chatUser} type={"chatFrame"}></Avatar>

          <div className="">
            {/* Chat user name */}
            <p
              className={`text-base font-medium dark:text-slate-50 ${
                !isSeen &&
                chatUser &&
                chatUser.id === chatUserId &&
                styles.userIncomingMessage
              }`}
            >
              {chatUser && chatUser.fullname}
            </p>
            {/* Last sent message */}
            <p
              className={`text-sm dark:text-zinc-400 ${
                !isSeen &&
                chatUser &&
                chatUser.id === chatUserId &&
                styles.incomingMessage
              }`}
            >
              {conversation.messages[conversation.messages.length - 1].message}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          {/* Date sent */}
          <p
            className={`dark:text-zinc-400 text-sm ${
              !isSeen &&
              chatUser &&
              chatUser.id === chatUserId &&
              styles.dateIncomingMessage
            }`}
          >
            {lastTimeFortmat}
          </p>
          {/* Indicated incomming message circle */}
          {!isSeen && chatUser && chatUser.id === chatUserId && (
            <span className={styles.circleIncomingMessage}></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;

function getChatUser(participants, authId) {
  if (participants.length === 0) return null;

  const Participant = participants.filter((participant) => {
    return participant.user.id !== authId;
  });

  return Participant[0].user;
}

function getLastMessage(conversation) {
  return conversation.messages[conversation.messages.length - 1];
}
