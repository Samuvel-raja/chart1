import axios from "axios";
import { CREATE_WATER, GET_ALL_WATERS } from "../apiUrls/waterApiUrl";

const postWaterApi=async(data)=>
{
    return axios(
        {
            method:"POST",
            data:data,
            url:CREATE_WATER
        }
    )
}
const getAllWatersApi=async()=>
    {
        return axios(
            {
                method:"GET",
                url:GET_ALL_WATERS
            }
        )
    }
export {postWaterApi,getAllWatersApi};