function followAPI(serverURL, getToken) {
  return {
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
}

export default followAPI;
