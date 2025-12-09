import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosInstanceAPI = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstanceAPI.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
