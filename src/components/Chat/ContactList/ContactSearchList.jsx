import { useContext } from "react";
import { UserContext } from "../../../Context";
import Avatar from "../../Avatar/Avatar";
import useAPI from "../../../hooks/useAPI";

const ContactSearchList = ({ contacts }) => {
  const userContext = useContext(UserContext);
  const api = useAPI();

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
            className="p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
          >
            <div className="flex gap-x-3">
              <Avatar user={contact} type="chatFrame" />
              <div>
                <p className="text-base dark:text-zinc-400 font-medium">
                  {contact.fullname}
                </p>
                <p className="text-sm font-medium text-zinc-500 dark:text-slate-50">
                  @{contact.username}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContactSearchList;
