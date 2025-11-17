import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useState } from "react";
import api from "../../api";

function Post(props) {
  const [likeCount, setLikeCount] = useState(props.post._count.Like);

  async function handleLike() {
    await api.likePost(props.post.id);
    const likeCount = await api.getLikes(props.post.id);
    setLikeCount(likeCount.length);
  }

  return (
    <>
      <div className="hover:shadow-lg p-5 bg-white rounded-2xl hover:-translate-y-1 transition-all">
        <div className="flex">
          <div className="flex flex-col gap-y-5 flex-1">
            <div className="flex gap-x-4 items-center ">
              {/* User avatar */}
              <img
                src={props.author.avatarPath}
                alt={`${props.author.fullname}'s avatar`}
                width={60}
                className="rounded-full"
              />
              {/* User Info */}
              <div>
                <p>{props.author.fullname}</p>
                <p className="text-xs">@{props.author.username}</p>
              </div>
            </div>
            {/* Post content */}
            <p>{props.post.body.slice(0, 146)}</p>
          </div>

          {/* Posted date */}
          <p className="text-xs shrink-0 text-gray-600">
            {new Date(props.post.createdAt).toDateString()}
          </p>
        </div>

        <div className="flex items-center gap-5 pt-3 border-t border-purple-100 mt-5">
          <FavoriteBorderOutlinedIcon
            className="hover:cursor-pointer hover:text-pink-700"
            onClick={handleLike}
          />{" "}
          {likeCount}
          <ChatBubbleOutlineOutlinedIcon /> {props.post._count.Comment}
          <ShareOutlinedIcon />
        </div>
      </div>
    </>
  );
}

export default Post;
