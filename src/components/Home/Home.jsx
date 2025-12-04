import { useContext, useEffect, useState } from "react";
import api from "../../api";
import Post from "../Post/Post";
import { HeaderContext } from "../../Context";
import { Loading } from "../Utilities/Utilities";
import useTitle from "../../hooks/useTitle";
import useAPI from "../../hooks/useAPI";

function Home() {
  useTitle("Home");
  const api = useAPI();
  const [posts, setPosts] = useState([]);

  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    async function fetchData() {
      const posts = await api.getPosts();
      setPosts(posts);
      headerContext.setactiveMenuItem("home");
    }

    fetchData();
  }, []);

  return (
    <>
      {posts.length === 0 && <Loading />}
      {posts.length > 0 &&
        posts.map((post) => (
          <Post key={post.id} author={post.author} post={post} />
        ))}
    </>
  );
}

export default Home;
