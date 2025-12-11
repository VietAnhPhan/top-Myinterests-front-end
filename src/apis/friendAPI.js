function friendAPI(serverURL, getToken) {
  return {
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
  };
}

export default friendAPI;
