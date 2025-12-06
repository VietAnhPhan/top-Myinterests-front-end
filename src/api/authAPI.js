function authAPI(serverURL) {
  return {
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
    loginAsGuest: async () => {
      try {
        const response = await fetch(`${serverURL}/auth/guests`, {
          method: "POST",
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
  };
}

export default authAPI;
