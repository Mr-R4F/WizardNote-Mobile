import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('auth_token') || '';

export const axiosInstanceAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: { Authorization: `Bearer ${token}` }
})