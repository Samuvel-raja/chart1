import axios from "axios";

import { WATER_URL } from "../apiUrls/waterApiUrl";

const postWaterApi=async(data)=>
{
    return axios(
        {
            method:"POST",
            data:data,
            url:WATER_URL
        }
    )
}
const getAllWatersApi=async()=>
    {
        return axios(
            {
                method:"GET",
                url:WATER_URL
            }
        )
    }
const deleteWaterApi=async(id)=>
{
    return axios(
        {
            method:"DELETE",
            url:`${WATER_URL}/${id}`
            
        }
    )
}
const updateWaterApi=async(id,data)=>
{
    return axios(
        {
            method:"PUT",
            data:data,
            url:`${WATER_URL}/${id}`
        }
    )
}
const getSingleWaterApi=async(id)=>
{
    return axios(
        {
            method:"GET",
            url:`${WATER_URL}/${id}`
        }
    )
}
export {postWaterApi,getAllWatersApi,deleteWaterApi,updateWaterApi,getSingleWaterApi};