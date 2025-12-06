function userAPI(serverURL, getToken) {
  return {
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
  };
}

export default userAPI;
