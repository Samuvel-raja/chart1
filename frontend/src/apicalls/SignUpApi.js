import axios from "axios";
import { GET_ALL_USERS, SIGN_UP_URL } from "../apiUrls/SignUpApiUrl";

const SignUpUser=(data)=>
{
    return axios({
      data:data,
      url:SIGN_UP_URL,
      method:"POST"
    })
}
const getAllSignUpUsers=()=>
  {
      return axios({
        url:GET_ALL_USERS,
        method:"GET"
      })
  }
export {SignUpUser,getAllSignUpUsers}