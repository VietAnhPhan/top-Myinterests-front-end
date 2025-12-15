import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router";

export function OneColLogin(props) {
  return (
    <div className="flex items-center h-full bg-[#f5f5f5]">
      <div className="w-xl mx-auto py-12 px-10 rounded-2xl">
        {/* Logo */}
        <div className="flex justify-center items-center gap-x-4 px-5">
          {/* <div
            className={`w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg`}
          >
            <span className="text-white text-xl">✨</span>
          </div> */}
          <p className="text-5xl">
            Please sign in
          </p>
        </div>
        <div className="flex items-center gap-x-10 h-full justify-center">
          <div className="rounded-md xl:col-span-1 xl:col-start-3 flex-1">
            {/* <div className="flex flex-col gap-2.5">
              <p className="text-gray-500 text-center">
                Sign in to your account to continue
              </p>
            </div> */}
            <form action={props.login} className="flex flex-col mt-5">
              <div className="flex flex-col">
                <label htmlFor="username">
                  Username:
                </label>
                <div className="flex">
                  {/* <span className="flex items-center h-[100%] border-1 border-r-0 rounded-l-md border-zinc-400 bg-icon-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-9 fill-zinc-500 pl-2 pr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span> */}
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="py-4 px-3 w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="password">
                  Password:
                </label>
                <div className="flex">
                  {/* <span className="flex items-center h-[100%] border-1 border-r-0 rounded-l-md border-zinc-400 bg-icon-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-9 fill-zinc-500 pl-2 pr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span> */}
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="py-4 px-3 w-full"
                    required
                    minLength={8}
                    maxLength={30}
                  />
                </div>
              </div>
              {props.authResults && (
                <p className="text-red-500">{props.authResults}</p>
              )}
              <button
                type="submit"
                className="mt-5 bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 font-medium text-xl"
              >
                Sign in
              </button>
              <p
                className={`text-center flex items-center gap-x-5 text-gray-400 text-xl mt-5 ${props.styles.line}`}
              >
                or
              </p>
              <div className="flex flex-col gap-y-5 mt-5">
                <a
                  href="/login/guest"
                  className="flex justify-center items-center gap-x-3 py-1.5 border flex-1 text-xl"
                >
                  <AccountCircleOutlinedIcon /> Guest
                </a>
                <a
                  href="/login/google"
                  className="flex justify-center items-center gap-x-3 py-1.5 border flex-1 text-xl"
                >
                  <GoogleIcon /> Google
                </a>
                <a
                  href="/login/github"
                  className="flex justify-center items-center gap-x-3 py-1.5 border flex-1 text-xl"
                  target="_blank"
                >
                  <GitHubIcon /> Github
                </a>
              </div>
              <div className="flex justify-center mt-5 gap-x-1">
                <p>Don't have an account?</p>
                <Link className="text-center" to="/sign-up">
                  Sign up with email
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
