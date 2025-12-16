import { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../Avatar/Avatar";
import { UserContext } from "../../Context";
import { DateTimeString } from "../utilities/Utilities";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAPI from "../../hooks/useAPI";
import PostInteraction from "./PostInteraction";
import { getDuration } from "../../helpers";

function Post(props) {
  const api = useAPI();
  const [likeCount, setLikeCount] = useState(props.post._count.Like);
  const userContext = useContext(UserContext);
  const [comments, setComments] = useState(props.post.Comment);
  const commentRef = useRef(null);
  const [isCommentsOpened, setCommentsOpened] = useState(false);
  const isLiked = checkIsLiked(props.post.Like, userContext.id);

  useEffect(() => {
    commentRef.current.classList.add("hidden");
  }, []);

  async function handleLike() {
    const Like = await api.post.likePost(props.post.id);
    const likeCount = await api.post.getLikes(props.post.id);

    if (userContext.id !== props.authorId && Like) {
      await api.notification.sendNotification(props.post.authorId, "like");
    }
    setLikeCount(likeCount.length);
  }

  function handleOpenComment() {
    if (!commentRef.current.classList.contains("hidden")) {
      commentRef.current.classList.add("hidden");
      setCommentsOpened(false);
    } else {
      commentRef.current.classList.remove("hidden");
      setCommentsOpened(true);
    }
  }

  async function handleSubmitComment(formData) {
    const sentComment = formData.get("comment");
    const Comment = await api.post.commentOnPost(props.post.id, sentComment);
    const updatedComments = [...comments];
    updatedComments.push(Comment);
    setComments(updatedComments);
  }

  return (
    <>
      <div className="first:rounded-t-4xl first:border-t post p-5 bg-white border-b border-l border-r border-zinc-300">
        <div className="flex flex-col gap-y-5 flex-1">
          <div className="flex gap-x-3">
            <div className="shrink-0">
              {/* User avatar */}
              <img
                src={props.author.avatarPath}
                alt={`${props.author.fullname}'s avatar`}
                width={40}
                className="rounded-full"
              />
            </div>

            {/* Username & content*/}
            <div className="flex flex-col">
              <div>
                {/* <p className="text-base font-normal">
                    {props.author.fullname}
                  </p> */}
                <div className="flex gap-x-3">
                  <p className="font-semibold text-sm">
                    {props.author.username}
                  </p>
                  {/* Posted date */}
                  <p className="text-sm  shrink-0 text-gray-500 flex-1 self-start">
                    {/* {new Date(props.post.createdAt).toDateString()} */}
                    {getDuration(props.post.createdAt)}
                  </p>
                </div>
              </div>
              {/* Post content */}
              <p className="text-[15px] mt-1">
                {props.post.body.slice(0, 146)}
              </p>

              {/* Interaction */}
              <PostInteraction
                isLiked={isLiked}
                handleLike={handleLike}
                likeCount={likeCount}
                handleOpenComment={handleOpenComment}
                commentCount={props.post._count.Comment}
              />
            </div>
          </div>

          {props.post.PostMedia &&
            props.post.PostMedia.length > 0 &&
            props.post.PostMedia.map((postMedia) => (
              <img key={postMedia.id} src={postMedia.filePath}></img>
            ))}
        </div>

        {/* Comment form */}
        <div className="flex gap-x-3 mt-5" ref={commentRef}>
          <Avatar user={userContext} type="commentAvatar" />
          <form action={handleSubmitComment} className="flex-1">
            <textarea
              className="border border-gray-300 w-full"
              placeholder="Comment your thoughts here..."
              name="comment"
            ></textarea>
            <button className="bg-gray-200 py-1 px-2 rounded-lg h-max">
              Send
            </button>
          </form>
        </div>

        {isCommentsOpened && comments && comments.length > 0 && (
          <ul>
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border-t border-gray-300 pt-3 mt-3"
              >
                <div className="flex items-center gap-x-3">
                  <Avatar user={comment.User} type="commentAvatar" />
                  <div className="text-sm">
                    <p className="flex gap-x-2">
                      <span className="font-semibold">
                        {comment.User.fullname}
                      </span>
                      <span className="text-right text-gray-500">
                        <DateTimeString datetime={comment.createdAt} />
                      </span>
                    </p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Post;

function checkIsLiked(likes, audienceId) {
  if (!likes) return false;
  const hasLike = likes.filter((like) => like.audienceId === audienceId);
  if (hasLike.length > 0) {
    return true;
  }
  return false;
}
