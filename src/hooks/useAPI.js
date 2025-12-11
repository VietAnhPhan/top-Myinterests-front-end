import authAPI from "../apis/authAPI";
import conversationAPI from "../apis/conversationAPI";
import followAPI from "../apis/followAPI";
import friendAPI from "../apis/friendAPI";
import friendRequestAPI from "../apis/friendRequestAPI";
import messageAPI from "../apis/messageAPI";
import notificationAPI from "../apis/notificationAPI";
import peopleAPI from "../apis/peopleAPI";
import postAPI from "../apis/postAPI";
import userAPI from "../apis/userAPI";

const serverURL = import.meta.env.PROD
  ? import.meta.env.VITE_SERVER_DOMAIN
  : import.meta.env.VITE_LOCAL_HOST;

const useAPI = (apiToken) => {
  // function getToken() {
  //   const access = JSON.parse(localStorage.getItem("myinterests_app_access"));
  //   return access ? access.token : "";
  // }
  return {
    conversation: conversationAPI(serverURL, apiToken),
    people: peopleAPI(serverURL, apiToken),
    user: userAPI(serverURL, apiToken),
    friendRequest: friendRequestAPI(serverURL, apiToken),
    auth: authAPI(serverURL),
    friend: friendAPI(serverURL, apiToken),
    message: messageAPI(serverURL, apiToken),
    post: postAPI(serverURL, apiToken),
    follow: followAPI(serverURL, apiToken),
    notification: notificationAPI(serverURL, apiToken),
  };
};

export default useAPI;
