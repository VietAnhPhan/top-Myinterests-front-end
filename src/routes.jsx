import { createBrowserRouter, redirect, useRouteError } from "react-router";
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
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Explore from "./components/Explore/Explore";
import MyPosts from "./components/Post/MyPosts";

const sitename = "Myinterests";

const router = createBrowserRouter([
  {
    path: "",
    middleware: [authMiddleware],
    loader: dataLoader,
    element: <App></App>,
    HydrateFallback: function Test() {
      return <>This is blank page</>;
    },
    children: [
      {
        path: "/",
        loader: homeLoader,
        element: <Home sitename={sitename} />,
        // HydrateFallback: Setting,
      },
      {
        path: "/chats",
        loader: homeLoader,
        element: <Chat sitename={sitename} />,
      },

      {
        path: "/profile",
        loader: dataLoader,
        element: (
          // <Wrapper>
          <Profile sitename={sitename} />
          // </Wrapper>
        ),
      },
      {
        path: "/settings",
        element: (
          <Wrapper>
            <Setting sitename={sitename} />
          </Wrapper>
        ),
      },
      {
        path: "/friends",
        loader: friendsLoader,
        element: (
          <Wrapper>
            <Friend sitename={sitename} />
          </Wrapper>
        ),
      },
      {
        path: "/search",
        loader: friendsLoader,
        element: (
          <Wrapper>
            <Search sitename={sitename} />
          </Wrapper>
        ),
      },
      {
        path: "/explore",
        loader: friendsLoader,
        element: (
          <Wrapper>
            <Explore sitename={sitename} />
          </Wrapper>
        ),
      },
      {
        path: "/posts",
        loader: dataLoader,
        element: (
          <Wrapper>
            <MyPosts sitename={sitename} />
          </Wrapper>
        ),
        ErrorBoundary: function ErrorBoundary() {
          let error = useRouteError();
          console.error(error);
          return <>Dang!</>;
        },
      },
    ],
  },
  {
    path: "/login",
    element: <Login sitename={sitename} />,
  },
  {
    path: "/sign-up",
    element: <Signup sitename={sitename} />,
  },
]);

async function authMiddleware({ context }) {
  const access = JSON.parse(localStorage.getItem("messaging_app_access"));

  if (!access) throw redirect("/login");

  const user = await api.getUser(access.username);

  if (!user) throw redirect("/login");

  context.set(UserContext, user);
}

function dataLoader({ context }) {
  const user = context.get(UserContext);

  return user;
}

async function homeLoader({ context }) {
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

export default router;
