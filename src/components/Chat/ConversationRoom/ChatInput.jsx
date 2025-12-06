import { useContext, useRef } from "react";
import {
  ConversationContext,
  SupabaseContext,
  UserContext,
} from "../../../Context";

import useAPI from "../../../hooks/useAPI";

const ChatInput = () => {
  const api = useAPI();
  const userContext = useContext(UserContext);
  const conversationContext = useContext(ConversationContext);

  const supabaseContext = useContext(SupabaseContext);

  let currentConversation = conversationContext.currentConversation;
  let updatedConversation = null;

  const imageUploadedContainerRef = useRef(null);
  const imageUploadedRef = useRef(null);
  const fileUploadedRef = useRef(null);

  async function handleSend(formData) {
    const message = formData.get("message");
    const image = formData.get("uploaded_image");
    let filePath = "";
    let fileType = "";

    if (message === "" && image.name === "") return;

    if (image.name) {
      const { data, error } = await supabaseContext.storage
        .from("messages")
        .upload(`conversation_${currentConversation.id}/${image.name}`, image, {
          upsert: true,
        });

      if (data) {
        console.log(data);
      } else {
        console.log(error);
        return;
      }

      filePath = data.fullPath;

      switch (image.type) {
        case "image/jpeg":
        case "image/png":
          fileType = "image";
          break;

        default:
          console.log("Can not identify file type.");
          break;
      }
    }

    const lastMessage = {
      message: message,
      userId: userContext.id,
      chatUserId: userContext.chatUser.id,
      filePath: filePath,
      fileType: fileType,
    };

    const sentMessage = await api.sendMessage(lastMessage);

    if (!currentConversation) {
      currentConversation = await api.getCurrentConversation([
        userContext.id,
        userContext.chatUser.id,
      ]);
      updatedConversation = { ...currentConversation };
    } else {
      updatedConversation = { ...currentConversation };
      updatedConversation.messages.push(sentMessage);
    }

    conversationContext.setCurrentConversation(updatedConversation);
  }

  function handleUpload(e) {
    imageUploadedContainerRef.current.style.display = "flex";
    const image = e.target.files[0];
    if (!image.type.startsWith("image/")) {
      console.log("The file uploaded is not image!");
      return;
    }

    imageUploadedRef.current.style.display = "block";

    imageUploadedRef.current.classList.add("obj");
    imageUploadedRef.current.file = image;

    const reader = new FileReader();

    reader.onload = (e) => {
      imageUploadedRef.current.src = e.target.result;
    };

    reader.readAsDataURL(image);
  }

  function handleClose() {
    imageUploadedContainerRef.current.style.display = "none";
    imageUploadedRef.current.src = null;
    imageUploadedRef.current.file = null;
    fileUploadedRef.current.value = null;
  }

  // async function handleSend(){

  // }

  return (
    <div className="py-4 px-6 gap-x-4 absolute w-full bottom-0 z-10">
      <form action={handleSend} className="flex gap-x-4">
        <div className="bg-white rounded-2xl flex-1 flex flex-col px-2">
          <div ref={imageUploadedContainerRef} className="justify-end hidden">
            <img
              ref={imageUploadedRef}
              src={null}
              alt="awaiting image"
              className="hidden w-32"
            />
            <svg
              className="w-6 h-6 text-gray-800 dark:text-slate-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              onClick={handleClose}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div className="flex items-center">
            <label htmlFor="uploaded_image">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-slate-900"
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
                  d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
            </label>
            <input
              ref={fileUploadedRef}
              type="file"
              className="hidden"
              id="uploaded_image"
              onChange={handleUpload}
              name="uploaded_image"
            />
            <input
              type="text"
              placeholder="Type message here..."
              className="w-full p-3 border-0 "
              name="message"
              // onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">
          <svg
            className="w-6 h-6 text-gray-800 rotate-90 dark:text-gray-50"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
