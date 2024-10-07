import axios from "axios";
import {LOGIN_URL } from "../apiUrls/LoginApiUrl";

const LoginUser=(data)=>
{
    return axios({
      data:data,
      url:LOGIN_URL,
      method:"POST"
    })
}
export {LoginUser}