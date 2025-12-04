import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { HeaderContext } from "../Context";
import { Settings } from "lucide-react";
import useTitle from "../hooks/useTitle";

const Setting = (props) => {
  useTitle("Settings");
  const navigate = useNavigate();

  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    headerContext.setactiveMenuItem("settings");
  });

  function logout() {
    localStorage.removeItem("myinterests_app_access");
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <>
      <div className="md:grid md:grid-cols-3 flex-1 overflow-y-auto h-full">
        <div className="flex col-span-1 flex-col gap-y-4 border-r border-r-slate-700">
          <p className="text-2xl">Settings</p>
          <ul>
            <li>
              <button
                className="hover:cursor-pointer flex gap-x-4"
                onClick={logout}
              >
                <svg
                  className="w-6 h-6 text-gray-800 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                  />
                </svg>
                Log out
              </button>
            </li>
          </ul>
        </div>
        <div className="col-span-2 text-4xl flex flex-col items-center justify-center dark:text-white gap-y-10">
          <Settings size={70} />
          <h1>Settings</h1>
        </div>
      </div>
    </>
  );
};

export default Setting;
