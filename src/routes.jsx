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
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Explore from "./components/Explore/Explore";
import MyPosts from "./components/Post/MyPosts";
import FriendList from "./components/FriendList";
import { ErrorCatching } from "./components/Utilities/Utilities";
import Notifications from "./components/Notification/Notifications";
import HydrationLoader from "./components/HydrationLoader";

const sitename = "Myinterests";

const router = createBrowserRouter([
  {
    path: "",
    middleware: [authMiddleware],
    loader: dataLoader,
    element: <App></App>,
    hydrateFallbackElement: <HydrationLoader />,
    children: [
      {
        path: "/",
        loader: homeLoader,
        element: <Home sitename={sitename} />,
        errorElement: <ErrorCatching />,
        // HydrateFallback: Setting,
      },
      {
        path: "/chats",
        loader: homeLoader,
        element: (
          <Wrapper>
            <Chat sitename={sitename} />
          </Wrapper>
        ),
        errorElement: <ErrorCatching />,
      },

      {
        path: "/profile",
        loader: dataLoader,
        element: (
          <Wrapper>
            <Profile sitename={sitename} />
          </Wrapper>
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
            <FriendList sitename={sitename} />
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
        errorElement: <ErrorCatching />,
      },
      {
        path: "/posts",
        loader: dataLoader,
        element: (
          <Wrapper>
            <MyPosts sitename={sitename} />
          </Wrapper>
        ),
        errorElement: <ErrorCatching />,
        // ErrorBoundary: function ErrorBoundary() {
        //   let error = useRouteError();
        //   console.error(error);
        //   return <>Dang!</>;
        // },
      },
      {
        path: "/notifications",
        element: (
          <Wrapper>
            <Notifications />
          </Wrapper>
        ),
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
