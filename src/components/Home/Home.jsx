import { useContext, useEffect, useState } from "react";
import api from "../../api";
import Post from "../Post/Post";
import { HeaderContext } from "../../Context";
import { Loading } from "../Utilities/Utilities";

function Home() {
  const [posts, setPosts] = useState([]);
  const postLength = posts.length;
  const col1 = countCol1(postLength);
  const col2 = Math.floor((postLength - col1) / 3);
  const col3 = Math.floor((postLength - (col1 + col2)) / 2);
  const col4 = Math.floor((postLength - (col1 + col2 + col3)) / 1);
  let index = col1;
  let postsCol1 = addPosts(posts, 0, col1);
  let postsCol2 = addPosts(posts, index, index + col2);
  let postsCol3 = addPosts(posts, index + col2, index + col2 + col3);
  let postsCol4 = addPosts(
    posts,
    index + col2 + col3,
    index + col2 + col3 + col4
  );

  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    headerContext.setactiveMenuItem("home");

    async function fetchData() {
      const posts = await api.getPosts();
      setPosts(posts);
    }

    fetchData();
  }, []);

  return (
    <>
      {posts.length === 0 && <Loading />}
      {posts.length > 0 && (
        <div className="flex p-7 gap-x-3 overflow-auto">
          <div className="flex flex-col gap-y-3">
            {postsCol1.map((post) => (
              <Post key={post.id} author={post.author} post={post} />
            ))}
          </div>
          <div className="flex flex-col gap-y-3">
            {postsCol2.map((post) => (
              <Post key={post.id} author={post.author} post={post} />
            ))}
          </div>
          <div className="flex flex-col gap-y-3">
            {postsCol3.map((post) => (
              <Post key={post.id} author={post.author} post={post} />
            ))}
          </div>
          <div className="flex flex-col gap-y-3">
            {postsCol4.map((post) => (
              <Post key={post.id} author={post.author} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;

function countCol1(number) {
  const count = Math.floor(number / 4);
  if (count == 0) {
    return Math.floor(number % 4);
  }
  return count;
}

function addPosts(posts, from, to) {
  const colPosts = [];
  for (let i = from; i < to; i++) {
    colPosts.push(posts[i]);
  }

  return colPosts;
}
