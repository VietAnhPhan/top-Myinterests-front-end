import useAuth from "./useAuth";
import useFriendRequest from "./useFriendRequest";
import usePeople from "./usePeople";
import usePost from "./usePost";

const serverURL = import.meta.env.PROD
  ? import.meta.env.VITE_SERVER_DOMAIN
  : import.meta.env.VITE_LOCAL_HOST;

const useAPI = () => {
  function getToken() {
    const access = JSON.parse(localStorage.getItem("myinterests_app_access"));
    return access ? access.token : "";
  }
  return {
    getConversations: async (userId) => {
      try {
        const response = await fetch(
          `${serverURL}/conversations?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${getToken()}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (error) {
        console.error(error.message);
      }
    },

    getCurrentConversation: async (userIds) => {
      try {
        const response = await fetch(
          `${serverURL}/conversations?userIds=${userIds}`,
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${getToken()}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },

    people: usePeople(serverURL, getToken),

    getChatUser: async (currentConversationId, authId) => {
      try {
        const response = await fetch(
          `${serverURL}/users?conversation_id=${currentConversationId}&auth_id=${authId}`,
          {
            method: "GET",
            headers: { Authorization: `bearer ${getToken()}` },
          }
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },

    getUser: async (username) => {
      try {
        const response = await fetch(
          `${serverURL}/users?username=${username}`,
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${getToken()}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        result.token = getToken();
        return result;
      } catch (err) {
        console.log(err);
      }
    },

    friendRequest: useFriendRequest(serverURL, getToken),
    auth: useAuth(serverURL),
   

    getFriends: async () => {
      try {
        const response = await fetch(`${serverURL}/friends?auth=true`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },

    sendMessage: async (message) => {
      try {
        const response = await fetch(`${serverURL}/messages`, {
          method: "POST",
          body: JSON.stringify(message),
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },

    updateProfile: async (authId, userData) => {
      try {
        const response = await fetch(`${serverURL}/users/${authId}`, {
          method: "PATCH",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        return { error: true, message: err.message };
      }
    },

    post: usePost(serverURL, getToken),

    followPerson: async (followerId, followeeId) => {
      try {
        const response = await fetch(`${serverURL}/followRequests`, {
          method: "POST",
          body: JSON.stringify({ followerId, followeeId }),
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },

    getFollowings: async () => {
      try {
        const response = await fetch(
          `${serverURL}/followRequests?followings=true`,
          {
            method: "GET",

            headers: {
              Authorization: `bearer ${getToken()}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },

    getFollowers: async () => {
      try {
        const response = await fetch(
          `${serverURL}/followRequests?followers=true`,
          {
            method: "GET",

            headers: {
              "Content-type": "application/json",
              Authorization: `bearer ${getToken()}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },

    loginAsGuest: async () => {
      try {
        const response = await fetch(`${serverURL}/auth/guests`, {
          method: "POST",

          headers: {
            Authorization: `bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },

    loginByGithub: () => {
      return `${serverURL}/auth/github`;
    },

    sendNotification: async (currentUserId, type) => {
      try {
        const response = await fetch(`${serverURL}/notifications`, {
          method: "POST",
          body: JSON.stringify({ currentUserId, type }),
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },

    getNotifications: async () => {
      try {
        const response = await fetch(`${serverURL}/notifications`, {
          method: "GET",

          headers: {
            Authorization: `bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },

    getFollowRequest: async (followerId, followeeId) => {
      try {
        const rs = await fetch(
          `${serverURL}/followRequests?followerId=${followerId}&followeeId=${followeeId}`,
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${getToken()}`,
            },
          }
        );

        const result = await rs.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export default useAPI;
