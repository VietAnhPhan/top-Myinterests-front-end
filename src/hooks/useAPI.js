import authAPI from "../api/authAPI";
import conversationAPI from "../api/conversationAPI";
import followAPI from "../api/followAPI";
import friendAPI from "../api/friendAPI";
import friendRequestAPI from "../api/friendRequestAPI";
import messageAPI from "../api/messageAPI";
import notificationAPI from "../api/notificationAPI";
import peopleAPI from "../api/peopleAPI";
import postAPI from "../api/postAPI";
import userAPI from "../api/userAPI";

const serverURL = import.meta.env.PROD
  ? import.meta.env.VITE_SERVER_DOMAIN
  : import.meta.env.VITE_LOCAL_HOST;

const useAPI = () => {
  function getToken() {
    const access = JSON.parse(localStorage.getItem("myinterests_app_access"));
    return access ? access.token : "";
  }
  return {
    conversation: conversationAPI(),
    people: peopleAPI(serverURL, getToken),
    user: userAPI(),
    friendRequest: friendRequestAPI(serverURL, getToken),
    auth: authAPI(serverURL),
    friend: friendAPI(),
    message: messageAPI(),
    post: postAPI(serverURL, getToken),
    follow: followAPI(serverURL, getToken),
    notification: notificationAPI(),
  };
};

export default useAPI;
