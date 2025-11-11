import { useContext } from "react";
import { UserContext } from "../../../Context";
import api from "../../../api";

const ContactSearchList = ({ contacts }) => {
  const userContext = useContext(UserContext);

  async function handleSelect(contact) {
    const currentConversation = await api.getCurrentConversation([
      userContext.id,
      contact.id,
    ]);

    userContext.handleSelectUser(contact, currentConversation);

    if (
      !userContext.screen.isChatWindow ||
      !userContext.screen.isConversationList
    ) {
      userContext.screen.setIsChatWindow(true);
      userContext.screen.setIsConversationList(false);
    }
  }

  return (
    <>
      {contacts.map((contact) => {
        return (
          <div
            onClick={() => handleSelect(contact)}
            key={contact.id}
            className="p-4 hover:bg-slate-800"
          >
            <p className="text-base font-medium dark:text-slate-50">
              {contact.username}
            </p>
            <p className="text-sm dark:text-zinc-400 font-medium">
              {contact.fullname}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default ContactSearchList;
