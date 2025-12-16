import { useEffect, useState, useContext } from "react";

import Post from "../Post/Post";
import { HeaderContext } from "../../Context";
import { Loading } from "../utilities/Utilities";
import useTitle from "../../hooks/useTitle";
import useAPI from "../../hooks/useAPI";

function Feeds() {
  useTitle("Home");
  const api = useAPI();
  const [posts, setPosts] = useState([]);

  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    async function fetchData() {
      const posts = await api.post.getPosts();
      setPosts(posts);
      headerContext.setactiveMenuItem("home");
    }

    fetchData();
  }, []);

  return (
    <div className="shadow rounded-4xl">
      {posts.length === 0 && <Loading />}
      {posts.length > 0 &&
        posts.map((post) => (
          <Post key={post.id} author={post.author} post={post} />
        ))}
    </div>
  );
}

export default Feeds;
