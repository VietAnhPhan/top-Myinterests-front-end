import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Avatar from "../Avatar/Avatar";
import { DateTimeString } from "../utilities/Utilities";

function LikeNotification(props) {
  return (
    <>
      <div className="flex gap-3">
        <div className="bg-red-100 p-2 rounded-full flex max-h-fit">
          <FavoriteOutlinedIcon className="text-[#ff6b9d]" fontSize="small" />
        </div>
        <Avatar user={props.data.OtherUser} type="headerFrame" />

        <p className="flex gap-x-1">
          <span>{props.data.OtherUser.fullname}</span>
          <span className="text-gray-500">liked your post</span>
        </p>
        <DateTimeString datetime={props.data.createdAt} />
      </div>
    </>
  );
}

export default LikeNotification;
