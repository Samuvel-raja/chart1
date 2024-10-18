import axios from "axios";
import { EMISSION_URL } from "../apiUrls/emissionApiUrl";

const getEmissionApi = () => {
  return axios({
    method: "GET",
    url: EMISSION_URL,
  });
};
const postEmissionApi = (data) => {
  return axios({
    method: "POST",
    url: EMISSION_URL,
    data: data,
  });
};
const deleteEmissionApi = (id) => {
  return axios({
    method: "DELETE",
    url: `${EMISSION_URL}/${id}`,
  });
};
const updateEmissionApi = (id, emdata) => {
  return axios({
    method: "PUT",
    data: emdata,
    url: `${EMISSION_URL}/${id}`,
  });
};
const getSingleEmissionApi = (id) => {
  return axios({
    method: "GET",
    url: `${EMISSION_URL}/${id}`,
  });
};
export {
  getEmissionApi,
  postEmissionApi,
  deleteEmissionApi,
  updateEmissionApi,
  getSingleEmissionApi,
};
