import axios from "axios"

// save or update user in db 
export const saveorupdateUser = async(userData)=>{
    const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/user`,userData)
    return data
    
}