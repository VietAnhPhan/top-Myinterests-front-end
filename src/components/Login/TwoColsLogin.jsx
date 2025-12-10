import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router";

export function TwoColsLogin(props) {
  return (
    <div className="grid grid-cols-7 h-full bg-gradient-to-br from-blue-300 to-pink-300">
      <div className="flex flex-col justify-center bg-white py-12 px-10 rounded-2xl col-span-3">
        {/* Logo */}
        <div className="flex justify-center items-center gap-x-4 px-5 pb-5">
          <p className="text-5xl">
            Share your experience
          </p>
        </div>
        <div className="flex items-center gap-x-10 justify-center">
          <div className="rounded-md xl:col-span-1 xl:col-start-3 flex-1">
            <div className="flex flex-col gap-2.5">
              <p className="text-lg text-gray-500 text-center">
                Whether you enjoy foods or get nice pictures at any places, let's share to others, they would love it too!
              </p>
            </div>
            <form action={props.login} className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="username" className="text-zinc-500">
                  Username:
                </label>

                <input
                  type="text"
                  name="username"
                  id="username"
                  className="p-1.5 w-full"
                  required
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-zinc-500">
                  Password:
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-1.5 w-full"
                  required
                  minLength={8}
                  maxLength={30}
                />
              </div>
              {props.authResults && (
                <p className="text-red-500">{props.authResults}</p>
              )}
              <button
                type="submit"
                className="mt-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-3 rounded-lg text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700"
              >
                Sign in
              </button>
              <p
                className={`text-center flex items-center gap-x-5 text-gray-400 text-xl mt-5 ${props.styles.line}`}
              >
                or
              </p>
              <div className="flex flex-col gap-y-3 mt-5">
                <a
                  href="/login/guest"
                  className="flex justify-center items-center gap-x-3 py-1.5 border border-gray-300 rounded-xl"
                >
                  <AccountCircleOutlinedIcon /> Continue as guest
                </a>
                <a
                  href="/login/google"
                  className="flex justify-center items-center gap-x-3 py-1.5 border border-gray-300 rounded-xl"
                >
                  <GoogleIcon /> Continue with Google
                </a>
                <a
                  href="/login/github"
                  className="flex justify-center items-center gap-x-3 py-1.5 border border-gray-300 rounded-xl"
                  target="_blank"
                >
                  <GitHubIcon /> Continue with Github
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
      <div className="col-span-4">
        <p>This is image</p>
      </div>
    </div>
  );
}
