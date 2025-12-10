import axios from 'axios';
import React from 'react';

const axiousSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const useAxiosSecure = () => {
    return axiousSecure;
};

export default useAxiosSecure;