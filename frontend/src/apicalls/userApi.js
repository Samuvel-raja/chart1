import axios from "axios";
import { USER_DETAILS_URL } from "../apiUrls/userApiUrl";

const getUserDetails = async () => {
  axios.defaults.withCredentials = true;
  return axios({
    method: "GET",
    url: USER_DETAILS_URL,
  });
};

export { getUserDetails };
