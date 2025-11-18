import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useContext, useEffect, useRef, useState } from "react";
import api from "../../api";
import Avatar from "../Avatar";
import { UserContext } from "../../Context";
import { DateTimeString } from "../Utilities/Utilities";

function Post(props) {
  const [likeCount, setLikeCount] = useState(props.post._count.Like);
  const userContext = useContext(UserContext);
  const [comments, setComments] = useState(props.post.Comment);
  const commentRef = useRef(null);

  useEffect(() => {
    commentRef.current.classList.add("hidden");
  }, []);

  async function handleLike() {
    await api.likePost(props.post.id);
    const likeCount = await api.getLikes(props.post.id);
    setLikeCount(likeCount.length);
  }

  function handleOpenComment() {
    if (!commentRef.current.classList.contains("hidden")) {
      commentRef.current.classList.add("hidden");
    } else commentRef.current.classList.remove("hidden");
  }

  async function handleSubmitComment(formData) {
    const sentComment = formData.get("comment");
    const Comment = await api.commentOnPost(props.post.id, sentComment);
    const updatedComments = [...comments];
    updatedComments.push(Comment);
    setComments(updatedComments);
  }

  return (
    <>
      <div className="hover:shadow-lg p-5 bg-white rounded-2xl hover:-translate-y-1 transition-all border border-gray-400">
        <div className="flex">
          <div className="flex flex-col gap-y-5 flex-1">
            <div className="flex items-center">
              <div className="flex gap-x-4">
                {/* User avatar */}
                <img
                  src={props.author.avatarPath}
                  alt={`${props.author.fullname}'s avatar`}
                  width={60}
                  className="rounded-full"
                />
                {/* User Info */}
                <div>
                  <p className="text-base font-normal">{props.author.fullname}</p>
                  <p className="text-xs text-gray-500">@{props.author.username}</p>
                </div>
              </div>
              {/* Posted date */}
              <p className="text-xs shrink-0 text-gray-600 flex-1 self-start text-right">
                {new Date(props.post.createdAt).toDateString()}
              </p>
            </div>
            {/* Post content */}
            <p className="text-[15px]">{props.post.body.slice(0, 146)}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 pt-3 border-t border-purple-100 mt-5">
          <FavoriteBorderOutlinedIcon
            className="hover:cursor-pointer hover:text-pink-700"
            onClick={handleLike}
          />
          {likeCount}
          <ChatBubbleOutlineOutlinedIcon
            onClick={handleOpenComment}
            className="hover:cursor-pointer"
          />
          {props.post._count.Comment}
          <ShareOutlinedIcon />
        </div>

        <div className="flex gap-x-3 mt-5" ref={commentRef}>
          <Avatar user={userContext} type="commentAvatar" />
          <form action={handleSubmitComment}>
            <textarea
              className="border border-gray-300"
              placeholder="Comment your thoughts here..."
              name="comment"
            ></textarea>
            <button className="bg-gray-200 py-1 px-2 rounded-lg h-max">
              Send
            </button>
          </form>
        </div>

        {comments.length > 0 && (
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
