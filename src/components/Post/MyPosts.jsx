import { useContext, useEffect, useRef, useState } from "react";
import Heading1 from "../Heading/Heading1";
import { useLoaderData } from "react-router";
import { ContentWrapper, ContentWrapperNoBorder } from "../Utilities/Utilities";
import Post from "./Post";
import Avatar from "../Avatar";
import { Button } from "../Button";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { WarningToast } from "../Toast";
import { HeaderContext, SupabaseContext } from "../../Context";
import useTitle from "../../hooks/useTitle";
import useAPI from "../../hooks/useAPI";

function MyPosts() {
  useTitle("Posts");
  const api = useAPI();
  const [posts, setPosts] = useState([]);
  const dataLoader = useLoaderData();
  const previewPhotos = useRef(null);
  const [error, setError] = useState("");
  const headerContext = useContext(HeaderContext);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const supabaseContext = useContext(SupabaseContext);

  useEffect(() => {
    async function fetchData() {
      const myPosts = await api.getPostsByUsername(dataLoader.username);
      setPosts(myPosts);
      headerContext.setactiveMenuItem("posts");
    }

    fetchData();
  }, []);

  function handleFiles(files) {
    setSelectedPhotos((prevSelectedPhots) => [...prevSelectedPhots, ...files]);

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue;
      }

      const img = document.createElement("img");
      img.classList.add("obj");
      img.file = file;
      previewPhotos.current.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async function handlePost(formData) {
    const body = formData.get("content");

    if (!body.trim() && selectedPhotos.length === 0) {
      setError("Post should have content!");
      return;
    }

    const Post = await api.createPost(body);

    const postMedias = [];

    for (const selectedPhoto of selectedPhotos) {
      const { data, error } = await supabaseContext.storage
        .from("posts")
        .upload(`${dataLoader.username}/${selectedPhoto.name}`, selectedPhoto, {
          upsert: true,
        });

      if (data) {
        postMedias.push({
          postId: Post.id,
          filePath: import.meta.env.VITE_SUPABASE_STORERAGE_URL + data.fullPath,
          type: selectedPhoto.type.split("/")[0],
        });
        console.log(data);
      } else {
        console.log(error);
        return;
      }
    }

    if (postMedias.length > 0) {
      const media = await api.createPostMedias(postMedias);
      console.log(media);
    }

    const updatedPosts = [...posts];
    updatedPosts.unshift(Post);

    setPosts(updatedPosts);
  }

  return (
    <>
      {error !== "" && <WarningToast message={error} />}
      <Heading1 text="My Posts" />
      <p className="mt-3">Create and manage your posts</p>

      {/* Post content */}
      <ContentWrapper>
        <form action={handlePost}>
          <div className="flex gap-x-5">
            <Avatar user={dataLoader} type={"chatFrame"} />
            <textarea
              name="content"
              className="flex-1 min-h-32 resize-none p-3 border border-purple-200 focus:border-purple-400 rounded-lg bg-purple-50/30"
              placeholder={"What's on your mind?"}
            ></textarea>
          </div>
          <div
            ref={previewPhotos}
            className="grid grid-cols-1 lg:grid-cols-5"
          ></div>
          <div className="flex justify-between mt-10">
            <label
              type="button"
              className="flex gap-x-2 items-center border border-purple-200 rounded-lg py-1 px-3 hover:bg-purple-50 hover:cursor-pointer"
              htmlFor="photos"
            >
              <AddPhotoAlternateOutlinedIcon />
              Add Image
            </label>
            <input
              multiple
              type="file"
              name="photos"
              id="photos"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <Button text="Post" type={"submit"}></Button>
          </div>
        </form>
      </ContentWrapper>

      {posts.length > 0 && (
        <>
          <p className="mt-10">Your posts ({posts.length})</p>
          <div className="flex flex-col gap-y-5 mt-5">
            {posts.map((post) => (
              <Post key={post.id} author={post.author} post={post} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default MyPosts;
