import { getEnvVariables } from '../helpers/getEnvVariables';
import axios from 'axios';

const { VITE_API_URL } = getEnvVariables();

const handleApi = axios.create({
    baseURL: VITE_API_URL,
});

handleApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default handleApi;