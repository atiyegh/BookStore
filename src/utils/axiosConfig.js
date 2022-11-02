import axios from "axios";

export const Setup ={
    endpoint:"http://172.16.25.111:8080",
    payment_endpoint:"https://",
    version:"v1",
  }

const axiosJson = axios.create({
    baseURL: Setup.endpoint,
    timeout: 40000
})