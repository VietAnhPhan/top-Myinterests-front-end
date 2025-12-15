import authAPI from "../apis/authAPI";
import postAPI from "../apis/postAPI";

const serverURL = import.meta.env.PROD
  ? import.meta.env.VITE_SERVER_DOMAIN
  : import.meta.env.VITE_LOCAL_HOST;

export default function useGuestAPI() {
  return { post: postAPI(serverURL, null), auth: authAPI(serverURL) };
}
