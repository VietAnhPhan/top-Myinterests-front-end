import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import { UserContext } from "./Context";
import Setting from "./components/Setting";
import Friend from "./components/Chat/Friend/Friend";
import Wrapper from "./components/Wrapper";
import api from "./api";
import Search from "./components/Search/Search";
import Explore from "./components/Explore/Explore";
import MyPosts from "./components/Post/MyPosts";
import FriendList from "./components/FriendList";
import { ErrorCatching } from "./components/utilities/Utilities";
import Notifications from "./components/Notification/Notifications";
import HydrationLoader from "./components/utilities/loader/HydrationLoader";
import { Home } from "./pages/Home";

const sitename = "Gotoplaces";

const router = createBrowserRouter([
  {
    path: "",
    loader: getUser,
    element: <App></App>,
    hydrateFallbackElement: <HydrationLoader />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/chats",
        middleware: [authMiddleware],
        loader: chatLoader,
        element: <Chat sitename={sitename} />,
        errorElement: <ErrorCatching />,
      },

      {
        path: "/profile",
        middleware: [authMiddleware],
        loader: getUser,
        element: <Profile sitename={sitename} />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/settings",
        element: <Setting sitename={sitename} />,
      },
      {
        path: "/friends",
        middleware: [authMiddleware],
        loader: getUser,
        element: <FriendList sitename={sitename} />,
      },
      {
        path: "/search",
        element: <Search sitename={sitename} />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/explore",
        middleware: [authMiddleware],
        loader: getUser,
        element: <Explore sitename={sitename} />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/posts",
        middleware: [authMiddleware],
        loader: getUser,
        element: <MyPosts sitename={sitename} />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/notifications",
        middleware: [authMiddleware],
        loader: getUser,
        element: <Notifications />,
        errorElement: <ErrorCatching />,
      },
    ],
  },

  {
    path: "/login",
    loader: hasLogin,
    element: <Login sitename={sitename} />,
  },
  {
    path: "/sign-up",
    element: <Signup sitename={sitename} />,
  },
  {
    path: "/login/guest",
    loader: loginAsGuest,
  },
  {
    path: "/login/github",
    loader: loginByGithub,
  },
]);

async function authMiddleware({ context }) {
  const access = JSON.parse(localStorage.getItem("myinterests_app_access"));

  if (!access) throw redirect("/login");

  const user = await api.getUser(access.username);

  if (!user) throw redirect("/login");

  context.set(UserContext, user);
}

function getUser({ context }) {
  const user = context.get(UserContext);

  return user;
}

async function chatLoader({ context }) {
  const user = context.get(UserContext);
  const conversations = await api.getConversations(user.id);
  let chatUser = null;

  const data = {
    user,
    conversations,
    chatUser,
  };

  return data;
}

async function friendsLoader() {
  const sentRequests = await api.getSentRequest();
  const friendList = await api.getFriends();
  const receivingRequests = await api.getReceivingInvitations();

  const friends = {
    sentRequests,
    friendList,
    receivingRequests,
  };

  return friends;
}

async function loginAsGuest() {
  const auth = await api.loginAsGuest();

  localStorage.setItem(
    "myinterests_app_access",
    JSON.stringify({
      username: auth.username,
      token: auth.token,
    })
  );
  throw redirect("/");
}

async function loginByGithub() {
  throw redirect(api.loginByGithub());
}
async function hasLogin() {
  const access = JSON.parse(localStorage.getItem("myinterests_app_access"));

  if (!access) return;

  const user = await api.getUser(access.username);
  if (user) {
    throw redirect("/");
  }
}

export default router;
