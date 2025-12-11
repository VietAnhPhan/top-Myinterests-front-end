function friendRequestAPI(serverURL, getToken) {
  return {
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
  };
}

export default friendRequestAPI;
