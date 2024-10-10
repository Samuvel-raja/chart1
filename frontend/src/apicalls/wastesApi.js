import axios from "axios";
import { CREATE_WASTE_URL, GET_ALL_WASTES_URL } from "../apiUrls/wastesApiUrl";

const postWastesApi = (data) => {
  return axios({
    method: "POST",
    data: data,
    url: CREATE_WASTE_URL,
  });
};
const getAllWastesApi = () => {
  return axios({
    method: "GET",
    url: GET_ALL_WASTES_URL,
  });
};

export {postWastesApi,getAllWastesApi};