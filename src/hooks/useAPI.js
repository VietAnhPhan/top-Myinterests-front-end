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

    getSearchPeople: async (search) => {
      try {
        const response = await fetch(`${serverURL}/users?search=${search}`, {
          method: "GET",
          headers: { Authorization: `bearer ${getToken()}` },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },

    getTopPeople: async () => {
      try {
        const response = await fetch(`${serverURL}/users?top_users=true`, {
          method: "GET",
          headers: { Authorization: `bearer ${getToken()}` },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },

    getSearchedPosts: async (search) => {
      try {
        const response = await fetch(`${serverURL}/posts?search=${search}`, {
          method: "GET",
          headers: { Authorization: `bearer ${getToken()}` },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },

    getPostsByUsername: async (username) => {
      try {
        const response = await fetch(`${serverURL}/posts/users/${username}`, {
          method: "GET",
          headers: { Authorization: `bearer ${getToken()}` },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },

    getTrendingPosts: async () => {
      try {
        const response = await fetch(`${serverURL}/posts?trending=true`, {
          method: "GET",
          headers: { Authorization: `bearer ${getToken()}` },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },

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

    getSentRequest: async () => {
      try {
        const response = await fetch(`${serverURL}/friendrequests?sent=true`, {
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

    login: async (username, password) => {
      const response = await fetch(`${serverURL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    },

    signUp: async (user) => {
      const response = await fetch(`${serverURL}/auth/sign-up`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    },

    sendInvitation: async (receiverId) => {
      const response = await fetch(`${serverURL}/friendrequests`, {
        method: "POST",
        body: JSON.stringify({
          receiverId: receiverId,
        }),
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
    },

    revokeInvitation: async (id) => {
      const response = await fetch(
        `${serverURL}/friendrequests/${id}?revoke=true`,
        {
          method: "PATCH",

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
    },

    rejectInvitation: async (id) => {
      const response = await fetch(
        `${serverURL}/friendrequests/${id}?reject=true`,
        {
          method: "PATCH",

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
    },

    getReceivingInvitations: async () => {
      try {
        const response = await fetch(
          `${serverURL}/friendrequests?receiving=true`,
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

    getInvitation: async (chatUserId) => {
      try {
        const response = await fetch(
          `${serverURL}/friendrequests?chatUserId=${chatUserId}`,
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

    acceptInvitation: async (id) => {
      try {
        const response = await fetch(
          `${serverURL}/friendrequests/${id}?accept=true`,
          {
            method: "PATCH",
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

    unfriend: async (id, chatUserId) => {
      try {
        const response = await fetch(
          `${serverURL}/friendrequests/${id}?unfriend=true&chatUserId=${chatUserId}`,
          {
            method: "PATCH",
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

    getPosts: async () => {
      try {
        const response = await fetch(`${serverURL}/posts`, {
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

    createPost: async (body) => {
      try {
        const response = await fetch(`${serverURL}/posts`, {
          method: "POST",
          body: JSON.stringify({ body }),
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

    likePost: async (postId) => {
      try {
        const response = await fetch(`${serverURL}/likes`, {
          method: "POST",
          body: JSON.stringify({ postId }),
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

    getLikes: async (postId) => {
      try {
        const response = await fetch(`${serverURL}/likes/posts/${postId}`, {
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

    commentOnPost: async (postId, comment) => {
      try {
        const response = await fetch(`${serverURL}/comments`, {
          method: "POST",
          body: JSON.stringify({ postId, comment }),
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

    createPostMedias: async (postMedias) => {
      try {
        const rs = await fetch(`${serverURL}/postMedias`, {
          method: "POST",
          body: JSON.stringify({ postMedias }),
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${getToken()}`,
          },
        });
        const result = await rs.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export default useAPI;
