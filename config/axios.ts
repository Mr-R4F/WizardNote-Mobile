import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('auth_token') || '';

export const axiosInstanceAPI = axios.create({
  baseURL: "https://api.example.com",
  headers: { Authorization: `Bearer ${token}` }
})