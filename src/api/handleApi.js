import { getEnvVariables } from '../helpers/getEnvVariables';
import axios from 'axios';

const { VITE_API_URL } = getEnvVariables();

const handleApi = axios.create({
    baseURL: VITE_API_URL
});

// Interceptors
handleApi.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    if ( token ) {
        config.headers = {
            ...config.headers,
            'x-token': token
        }
    }
    return config;
});

export default handleApi;