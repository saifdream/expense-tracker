import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:9000",
    baseURL: "https://sleepy-refuge-75797.herokuapp.com/api",
});

export default axiosInstance;
