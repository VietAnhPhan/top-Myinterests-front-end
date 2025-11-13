import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

function Post(props) {
  return (
    <>
      <div>
        <div className="flex gap-x-4 items-center pb-5">
          <img
            src={props.author.avatarPath}
            alt={`${props.author.fullname}'s avatar`}
            width={60}
            className="rounded-full"
          />
          <div>
            <p>{props.author.fullname}</p>
            <p className="text-xs">@{props.author.username}</p>
          </div>
        </div>
        <p>{props.post.body.slice(0, 146)}</p>
        <div className="flex items-center gap-5 pt-3 border-t border-purple-100 mt-5">
          <FavoriteBorderOutlinedIcon /> {props.post._count.Like}
          <ChatBubbleOutlineOutlinedIcon /> {props.post._count.Comment}
          <ShareOutlinedIcon />
        </div>
      </div>
    </>
  );
}

export default Post;
