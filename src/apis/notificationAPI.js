function notificationAPI(serverURL, apiToken) {
  return {
    sendNotification: async (currentUserId, type) => {
      try {
        const response = await fetch(`${serverURL}/notifications`, {
          method: "POST",
          body: JSON.stringify({ currentUserId, type }),
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${apiToken}`,
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
            Authorization: `bearer ${apiToken}`,
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
}

export default notificationAPI;
