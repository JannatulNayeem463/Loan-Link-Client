import { useEffect } from "react";
import axios from "axios";

const useAxiosSecure = () => {

  const axiosSecure = axios.create({
    baseURL: "https://loan-link-server-ruby.vercel.app",
  });

  useEffect(() => {

    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );


    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized, redirect to login");
          window.location.href = "/auth/login";
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
