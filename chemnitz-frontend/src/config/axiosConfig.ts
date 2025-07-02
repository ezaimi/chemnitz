import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // base API path, no /feature suffix here
  timeout: 5000,
});


export default axiosInstance;
