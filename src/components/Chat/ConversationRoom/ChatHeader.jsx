import Avatar from "../../Avatar/Avatar";

const ChatHeader = ({ chatUser, controls }) => {
  return (
    <div className="flex z-10">
      <button
        className="md:hidden px-3"
        onClick={controls.handleBacktoConversation}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-gray-50"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
      </button>
      <div
        className="flex items-center px-3 py-2"
        onClick={controls.handleOpenContactInfo}
      >
        <div className="hover:cursor-pointer flex items-center gap-x-5">
          <Avatar user={chatUser} type={"headerFrame"}></Avatar>

          <p className="dark:text-gray-50 font-semibold">
            {chatUser && chatUser.fullname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
