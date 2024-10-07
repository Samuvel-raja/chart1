import axios from 'axios';
import { EMISSION_URL } from '../apiUrls/emissionApiUrl';

const getEmissionApi=async()=>
{
    return axios(
        {
            method:"GET",
            url:EMISSION_URL
        }
    )
}
const postEmissionApi=async(data)=>
    {
        return axios(
            {
                method:"POST",
                url:EMISSION_URL,
                data:data
            }
        )
    }
export {getEmissionApi,postEmissionApi}