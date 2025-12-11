function peopleAPI(serverURL, getToken) {
  return {
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
  };
}

export default peopleAPI;
