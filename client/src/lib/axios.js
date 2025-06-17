import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "development"?"http://localhost:5005/api":"/api",
    // baseUrl: "dapper-froyo-c36250.netlify.app/api",
    withCredentials: true
})