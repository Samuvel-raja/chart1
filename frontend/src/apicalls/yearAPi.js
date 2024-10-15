import { ADD_YEAR_URL, DELETE_YEAR_URL } from "../apiUrls/yearApiUrl";
import axios from "axios";

const postYearApi = (data) => {
  return axios({
    method: "POST",
    data: data,
    url: ADD_YEAR_URL,
  });
};

const getAllYearsApi = () => {
  return axios({
    method: "GET",
    url: ADD_YEAR_URL,
  });
};

const deleteYear = (id) => {
  
  return axios({
    method: "DELETE",
    url: `${DELETE_YEAR_URL}/${id}`,
  });
};

export { postYearApi, getAllYearsApi, deleteYear };
