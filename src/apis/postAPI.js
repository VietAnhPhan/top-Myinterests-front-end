function postAPI(serverURL, apiToken) {
  // Unauthenticated
  if (!apiToken) {
    return {
      getPosts: async () => {
        try {
          const response = await fetch(`${serverURL}/posts`, {
            method: "GET",
            // headers: {
            //   Authorization: `bearer ${apiToken}`,
            // },
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
  
  // Autheticated
  return {
    getPosts: async () => {
      try {
        const response = await fetch(`${serverURL}/posts`, {
          method: "GET",
          // headers: {
          //   Authorization: `bearer ${apiToken}`,
          // },
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
    getPostsByUsername: async (username) => {
      try {
        const response = await fetch(`${serverURL}/posts/users/${username}`, {
          method: "GET",
          headers: { Authorization: `bearer ${apiToken}` },
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
    getTrendingPosts: async () => {
      try {
        const response = await fetch(`${serverURL}/posts?trending=true`, {
          method: "GET",
          headers: { Authorization: `bearer ${apiToken}` },
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
    getSearchedPosts: async (search) => {
      try {
        const response = await fetch(`${serverURL}/posts?search=${search}`, {
          method: "GET",
          headers: { Authorization: `bearer ${apiToken}` },
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
    createPost: async (body) => {
      try {
        const response = await fetch(`${serverURL}/posts`, {
          method: "POST",
          body: JSON.stringify({ body }),
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
    createPostMedias: async (postMedias) => {
      try {
        const rs = await fetch(`${serverURL}/postMedias`, {
          method: "POST",
          body: JSON.stringify({ postMedias }),
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${apiToken}`,
          },
        });
        const result = await rs.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    likePost: async (postId) => {
      try {
        const response = await fetch(`${serverURL}/likes`, {
          method: "POST",
          body: JSON.stringify({ postId }),
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

    getLikes: async (postId) => {
      try {
        const response = await fetch(`${serverURL}/likes/posts/${postId}`, {
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

    commentOnPost: async (postId, comment) => {
      try {
        const response = await fetch(`${serverURL}/comments`, {
          method: "POST",
          body: JSON.stringify({ postId, comment }),
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
  };
}

export default postAPI;
