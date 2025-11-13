import { MessageSquareText, Users, Settings } from "lucide-react";
import styles from "./header.module.css";

import { Link } from "react-router";
import { useContext } from "react";
import { AvatarContext, HeaderContext } from "../Context";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

export const Header = ({ loaderData }) => {
  const avatarContext = useContext(AvatarContext);
  const headerContext = useContext(HeaderContext);

  return (
    <header className="flex md:flex-col bg-zinc-100 dark:bg-slate-800 md:py-8 border-r-[1px] border-r-zinc-300 dark:border-r-slate-700 z-10 w-64 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-x-4 border-b border-purple-200 px-5 pb-5">
        <div
          className={`w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg`}
        >
          <span className="text-white text-xl">✨</span>
        </div>
        <span className="text-lg bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Myinterest
        </span>
      </div>
      {/* Menu items */}
      <div className="px-5 pt-10 flex-1">
        <div className="flex flex-col gap-y-3">
          <Link to="/">
            <div
              className={`${styles.menuIconWrapper} ${
                headerContext.activeMenuItem === "home"
                  ? styles.activeMenuItem
                  : ""
              } flex items-center gap-x-3`}
            >
              <HomeOutlinedIcon /> Home
            </div>
          </Link>
          <Link to="/search">
            <div
              className={`${styles.menuIconWrapper} ${
                headerContext.activeMenuItem === "search"
                  ? styles.activeMenuItem
                  : ""
              } flex items-center gap-x-3`}
            >
              <SearchOutlinedIcon /> Search
            </div>
          </Link>
          <Link to="/explore">
            <div
              className={`${styles.menuIconWrapper} ${
                headerContext.activeMenuItem === "explore"
                  ? styles.activeMenuItem
                  : ""
              } flex items-center gap-x-3`}
            >
              <ExploreOutlinedIcon /> Explore
            </div>
          </Link>
          <Link to="/notifications">
            <div
              className={`${styles.menuIconWrapper} ${
                headerContext.activeMenuItem === "notifications"
                  ? styles.activeMenuItem
                  : ""
              } flex items-center gap-x-3`}
            >
              <NotificationsNoneOutlinedIcon /> Notifications
            </div>
          </Link>
          <Link to="/posts">
            <div
              className={`${styles.menuIconWrapper} ${
                headerContext.activeMenuItem === "posts"
                  ? styles.activeMenuItem
                  : ""
              } flex items-center gap-x-3`}
            >
              <FeedOutlinedIcon /> Posts
            </div>
          </Link>
          <Link to="/chats">
            <div
              className={`${styles.menuIconWrapper} ${
                headerContext.activeMenuItem === "chats"
                  ? styles.activeMenuItem
                  : ""
              } flex items-center gap-x-3`}
            >
              <ChatBubbleOutlineOutlinedIcon /> Chats
            </div>
          </Link>
          <Link to="/friends">
            <div
              className={`${styles.menuIconWrapper} ${
                headerContext.activeMenuItem === "friends"
                  ? styles.activeMenuItem
                  : ""
              } flex items-center gap-x-3`}
            >
              <Users /> Friends
            </div>
          </Link>
        </div>
      </div>

      {/* Profile & Settings */}
      <div className="border-t border-purple-200">
        <div className="flex flex-col gap-y-5 px-5 pt-5">
          <Link to="/settings">
            <div
              className={`${styles.menuIconWrapper} ${
                headerContext.activeMenuItem === "settings"
                  ? styles.activeMenuItem
                  : ""
              } flex items-center gap-x-3`}
            >
              <Settings className={styles.menuIcon} /> Settings
            </div>

            {/* Profile */}
          </Link>
          <div className="flex md:block">
            <Link to="/profile" className="col-start-1 flex md:block">
              <div
                className={`${styles.menuIconWrapper} ${
                  headerContext.activeMenuItem === "profile"
                    ? styles.activeMenuItem
                    : ""
                } flex items-center gap-x-3`}
              >
                {loaderData.avatarPath ? (
                  <div className="w-10 h-10">
                    <img
                      className="rounded-[50%] object-cover object-top w-full h-full"
                      src={`${avatarContext.avatarPath}`}
                      alt={`${loaderData.name}'s avatar`}
                    />
                  </div>
                ) : (
                  <svg
                    className="w-[48px] h-[48px] dark:text-gray-50"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                <div>
                  <p>{loaderData.fullname}</p>
                  <p className="text-xs text-gray-500">
                    @{loaderData.username}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
