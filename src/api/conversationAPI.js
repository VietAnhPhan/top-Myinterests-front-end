function conversationAPI(serverURL, getToken) {
  return {
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
  };
}

export default conversationAPI;
