function messageAPI(serverURL, getToken) {
  return {
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
  };
}
export default messageAPI;
