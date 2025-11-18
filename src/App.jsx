import "./App.css";

import { Header } from "./header/header.jsx";
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
  const [avatarPath, setavatarPath] = useState(loaderData.avatarPath);
  const [activeMenuItem, setactiveMenuItem] = useState("home");

  return (
    <>
      <UserContext value={loaderData}>
        <AvatarContext value={{ avatarPath, setavatarPath }}>
          <HeaderContext value={{ activeMenuItem, setactiveMenuItem }}>
            <div className="flex flex-col-reverse md:flex-row h-full dark:bg-slate-900 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300">
              <Header loaderData={loaderData}></Header>

              <SupabaseContext value={supabase}>
                <Outlet></Outlet>
              </SupabaseContext>
            </div>
          </HeaderContext>
        </AvatarContext>
      </UserContext>
    </>
  );
}

export default App;
