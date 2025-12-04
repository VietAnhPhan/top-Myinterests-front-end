import { useContext, useEffect, useRef, useState } from "react";

import { useLoaderData } from "react-router";
import { AvatarContext, HeaderContext, SupabaseContext } from "../../Context";
import Heading1 from "../Heading/Heading1";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useTitle from "../../hooks/useTitle";
import useAPI from "../../hooks/useAPI";

const Profile = () => {
  useTitle("Profile");
  const api = useAPI();
  const loaderData = useLoaderData();

  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPassword] = useState("");
  const [fullname, setFullname] = useState(loaderData.fullname);
  const [about, setAbout] = useState(loaderData.about);
  const [phone, setPhone] = useState(loaderData.phone);

  const [isUpdate, setIsupdate] = useState(false);
  const [result, setResult] = useState("");
  const [validations, setValidations] = useState([]);
  const supabaseContext = useContext(SupabaseContext);

  const avatarInputRef = useRef(null);
  const avatarPlaceholderRef = useRef(null);
  const avatarUploadedRef = useRef(null);

  const avatarContext = useContext(AvatarContext);

  const headerContext = useContext(HeaderContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    headerContext.setactiveMenuItem("profile");
  }, []);

  async function handleUpdate(formData) {
    setIsLoading(true);
    const password = formData.get("password");
    const repeatPassword = formData.get("repeat_password");
    const uploadeAvatar = formData.get("uploaded_avatar");

    if (uploadeAvatar.name !== "") {
      const { data, error } = await supabaseContext.storage
        .from("avatars")
        .upload(`${loaderData.username}/${uploadeAvatar.name}`, uploadeAvatar, {
          upsert: true,
        });

      if (data) {
        console.log(data);
      } else {
        console.log(error);
        return;
      }
      formData.append("avatarPath", data.fullPath);
      avatarContext.setavatarPath(data.fullPath);
    }

    if (password !== repeatPassword) {
      setValidations([
        ...validations,
        "Repeat password does not match password",
      ]);
      return;
    } else {
      setValidations([]);
    }

    const userData = {
      username: formData.get("username"),
      password: formData.get("password"),
      fullname: formData.get("fullname"),
      about: formData.get("about"),
      phone: formData.get("phone"),
      avatarPath: formData.get("avatarPath"),
    };

    const result = await api.updateProfile(loaderData.id, userData);

    if (result.error) {
      setIsupdate(false);
      setResult(result.message);
      setIsLoading(false);
      return;
    }

    setIsupdate(false);
    setResult("You updated successfully!");
    setIsLoading(false);
  }

  function handleEdit() {
    if (!isUpdate) setIsupdate(true);
    else setIsupdate(false);
  }

  async function handleUpload(e) {
    if (avatarPlaceholderRef.current)
      avatarPlaceholderRef.current.style.display = "none";

    const avatarFile = e.target.files[0];
    if (!avatarFile.type.startsWith("image/")) {
      console.log("The file uploaded is not image!");
      return;
    }

    // avatarUploadedRef.current.style.display = "block";

    // avatarUploadedRef.current.classList.add("obj");
    // avatarUploadedRef.current.file = avatarFile;

    const reader = new FileReader();

    reader.onload = (e) => {
      if (!avatarInputRef.current) {
        avatarUploadedRef.current.style.display = "block";
        avatarUploadedRef.current.classList.add("obj");
        avatarUploadedRef.current.src = e.target.result;
      }

      if (avatarInputRef.current) {
        avatarInputRef.current.src = e.target.result;
      }
    };

    reader.readAsDataURL(avatarFile);
  }

  return (
    <>
      <Heading1 text="Profile" />
      <p className="mt-3">Manage your profile and personal information</p>
      {isLoading && <p>Saving...</p>}
      {!isLoading && (
        <form
          action={handleUpdate}
          className="profile__form bg-white p-10 rounded-xl border-purple-200 border-2 mt-5"
        >
          <div className="flex flex-col gap-y-5">
            {/* Avatar */}
            <div className="flex">
              <label htmlFor="uploaded-avatar">
                <div className="w-30 h-30">
                  {loaderData.avatarPath ? (
                    <img
                      className="w-full h-full object-cover object-top rounded-[50%]"
                      src={`${loaderData.avatarPath}`}
                      ref={avatarInputRef}
                    ></img>
                  ) : (
                    <>
                      <svg
                        ref={avatarPlaceholderRef}
                        className="w-30 h-30 text-gray-800 dark:text-white"
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
                    </>
                  )}
                  <img
                    ref={avatarUploadedRef}
                    src={null}
                    alt="uploaded avatar"
                    className="hidden w-36"
                  />
                </div>
              </label>
              <input
                type="file"
                name="uploaded_avatar"
                id="uploaded-avatar"
                className="dark:text-gray-50 hidden"
                onChange={handleUpload}
              />

              {/* Update button */}
              <div className="flex gap-2.5 flex-1 h-fit">
                {isUpdate && (
                  <button
                    type="submit"
                    className="mt-5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-3 py-1 rounded-lg hover:cursor-pointer"
                  >
                    Save changes
                  </button>
                )}

                {isUpdate ? (
                  <button
                    type="button"
                    className={
                      "mt-5 bg-gray-300 hover:cursor-pointer px-5 flex items-center gap-x-3 rounded-lg"
                    }
                    onClick={handleEdit}
                  >
                    <CloseOutlinedIcon fontSize="small" />
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className={
                      "mt-5 bg-green-600 text-white hover:cursor-pointer px-5 py-1 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center gap-x-3"
                    }
                    onClick={handleEdit}
                  >
                    <EditOutlinedIcon fontSize="small" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-y-3">
              {/* Fullname */}
              <div className="flex gap-5">
                <div className="flex-1 flex flex-col">
                  <label htmlFor="password">Fullname</label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="p-1.5 w-full dark:text-gray-50"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                {/* Username */}
                <div className="flex-1 flex flex-col">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="p-1.5 w-full dark:text-gray-50"
                    defaultValue={loaderData.username}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="p-1.5 w-full dark:text-gray-50"
                  defaultValue={loaderData.email}
                  disabled
                />
              </div>
              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-1.5 w-full dark:text-gray-50"
                  minLength={8}
                  maxLength={30}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* Repeat password */}
              <div className="flex flex-col">
                <label htmlFor="password">Repeat Password</label>
                <input
                  type="password"
                  name="repeat_password"
                  id="repeat_password"
                  className="p-1.5 w-full dark:text-gray-50"
                  minLength={8}
                  maxLength={30}
                  value={repeatPassword}
                  onChange={(e) => setrepeatPassword(e.target.value)}
                />
              </div>

              {/* About */}
              <div className="flex flex-col">
                <label htmlFor="password">About</label>
                <textarea
                  className="dark:text-gray-50"
                  name="about"
                  defaultValue={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
              {/* Phone */}
              <div className="flex flex-col">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone ? phone : ""}
                  className="dark:text-gray-50 p-1.5"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Validations */}
          {validations.length > 0 && (
            <ul>
              {validations.map((validation, index) => {
                return (
                  <li key={index} className="text-red-500 ">
                    {validation}
                  </li>
                );
              })}
            </ul>
          )}
          {result ? <p className="dark:text-green-500">{result}</p> : ""}
        </form>
      )}
    </>
  );
};

export default Profile;
