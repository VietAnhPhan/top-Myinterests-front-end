const serverURL = import.meta.env.PROD
  ? import.meta.env.VITE_SERVER_DOMAIN
  : import.meta.env.VITE_LOCAL_HOST;

const access = JSON.parse(localStorage.getItem("messaging_app_access"));
const token = access ? access.token : "";

const api = {
  getConversations: async (userId) => {
    try {
      const response = await fetch(
        `${serverURL}/conversations?userId=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
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
            Authorization: `bearer ${token}`,
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

  getSearchContact: async (search) => {
    try {
      const response = await fetch(
        `${serverURL}/users?contact=${search}&search=true`,
        {
          method: "GET",
          headers: { Authorization: `bearer ${token}` },
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

  getChatUser: async (currentConversationId, authId) => {
    try {
      const response = await fetch(
        `${serverURL}/users?conversation_id=${currentConversationId}&auth_id=${authId}`,
        {
          method: "GET",
          headers: { Authorization: `bearer ${token}` },
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
      const response = await fetch(`${serverURL}/users?username=${username}`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      result.token = token;
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
          Authorization: `bearer ${token}`,
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
        Authorization: `bearer ${token}`,
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
          Authorization: `bearer ${token}`,
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
          Authorization: `bearer ${token}`,
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
            Authorization: `bearer ${token}`,
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
            Authorization: `bearer ${token}`,
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
            Authorization: `bearer ${token}`,
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
            Authorization: `bearer ${token}`,
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
          Authorization: `bearer ${token}`,
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
          Authorization: `bearer ${token}`,
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
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
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

   getPosts: async () => {
    try {
      const response = await fetch(`${serverURL}/posts`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
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
};

export default api;
