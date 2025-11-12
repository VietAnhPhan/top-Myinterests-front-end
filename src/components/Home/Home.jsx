import { Fragment, useEffect, useState } from "react";
import api from "../../api";
import Post from "../Post/Post";

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

  useEffect(() => {
    async function fetchData() {
      const posts = await api.getPosts();
      setPosts(posts);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="flex overflow-auto">
        <div className="flex flex-col">
          {postsCol1.map((post) => (
            <div key={post.id}>
              <Post author={post.author} post={post} />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {postsCol2.map((post) => (
            <div key={post.id}>
              <Post author={post.author} post={post} />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {postsCol3.map((post) => (
            <div key={post.id}>
              <Post author={post.author} post={post} />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {postsCol4.map((post) => (
            <div key={post.id}>
              <Post author={post.author} post={post} />
            </div>
          ))}
        </div>
      </div>
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
