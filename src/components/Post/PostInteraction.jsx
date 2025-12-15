import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

export default function PostInteraction(props) {
  return (
    <div className="flex items-center mt-5 gap-x-6">
      <div className="flex gap-x-1 items-center text-gray-800">
        {!props.isLiked && (
          <FavoriteBorderOutlinedIcon
            className="hover:cursor-pointer hover:text-pink-700 text-5xl"
            fontSize="small"
            onClick={props.handleLike}
          />
        )}
        {props.isLiked && (
          <FavoriteIcon
            className="hover:cursor-pointer text-pink-700"
            fontSize="small"
            onClick={props.handleLike}
          />
        )}
        <span className="text-sm">{props.likeCount}</span>
      </div>

      {/* {props.Like} */}
      <div className="flex gap-x-1 items-center text-gray-800">
        <ChatBubbleOutlineOutlinedIcon
          onClick={props.handleOpenComment}
          className="hover:cursor-pointer"
          fontSize="small"
        />
        <span className="text-sm">{props.commentCount}</span>
      </div>
      {/* <ShareOutlinedIcon fontSize="small" /> */}
    </div>
  );
}
