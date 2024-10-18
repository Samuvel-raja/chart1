import axios from "axios";
import { WASTE_URL } from "../apiUrls/wastesApiUrl";

const postWastesApi = (data) => {
  return axios({
    method: "POST",
    data: data,
    url: WASTE_URL,
  });
};
const getAllWastesApi = () => {
  return axios({
    method: "GET",
    url: WASTE_URL,
  });
};

const deleteWasteApi = (id) => {
  return axios({
    method: "DELETE",
    url: `${WASTE_URL}/${id}`,
  });
};

const updateWasteApi=(id,data)=>
{
  return axios(
    {
      method:"PUT",
      url: `${WASTE_URL}/${id}`,
      data:data
    }
  )
}

const getSingleWasteApi=(id)=>
{
  return axios(
    {
      method:"GET",
      url: `${WASTE_URL}/${id}`,
    }
  )
}

export { postWastesApi, getAllWastesApi, deleteWasteApi,updateWasteApi,getSingleWasteApi };
