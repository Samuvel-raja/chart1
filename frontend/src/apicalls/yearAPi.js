import { ADD_YEAR_URL } from "../apiUrls/yearApiUrl";
import axios from "axios";

const postYearApi = (data) => {

  return axios({
    method: "POST",
    data: data,
    url: ADD_YEAR_URL,
  });
};

const getAllYearsApi = (data) => {

    return axios({
      method: "GET",
      url: ADD_YEAR_URL,
    });
  };

export { postYearApi ,getAllYearsApi};
