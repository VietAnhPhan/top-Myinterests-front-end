import "./App.css";

import { Header } from "./components/Header/Header.jsx";
import { Outlet, useLoaderData } from "react-router";

import { createClient } from "@supabase/supabase-js";
import {
  AvatarContext,
  HeaderContext,
  SupabaseContext,
  UserContext,
} from "./Context.js";
import { useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

function App() {
  const loaderData = useLoaderData();
  // const [avatarPath, setavatarPath] = useState(loaderData.avatarPath);
  const [activeMenuItem, setactiveMenuItem] = useState("home");

  return (
    <>
      {/* <UserContext value={loaderData}>
        <AvatarContext value={{ avatarPath, setavatarPath }}> */}
          <HeaderContext value={{ activeMenuItem, setactiveMenuItem }}>
            <div className="flex flex-col-reverse md:flex-row h-full dark:bg-slate-900 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
              <Header loaderData={loaderData}></Header>

              <SupabaseContext value={supabase}>
                {activeMenuItem !== "chats" && (
                  <div className="overflow-auto flex-1">
                    <div className="grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-5 p-7 h-full">
                      <div className="2xl:col-start-2 2xl:col-span-2 xl:col-start-2 xl:col-span-3 flex flex-col gap-y-3">
                        <Outlet></Outlet>
                      </div>
                    </div>
                  </div>
                )}

                {activeMenuItem === "chats" && (
                  <div className="overflow-auto flex-1">
                    <div className="grid grid-cols-1 xl:grid-cols-8 p-7 h-full">
                      <div className="xl:col-start-2 xl:col-span-6 flex flex-col gap-y-3">
                        <Outlet></Outlet>
                      </div>
                    </div>
                  </div>
                )}
              </SupabaseContext>
            </div>
          </HeaderContext>
        {/* </AvatarContext>
      </UserContext> */}
    </>
  );
}

export default App;
