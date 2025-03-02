import { getEnvVariables } from '../helpers/getEnvVariables';
import axios from 'axios';

const { VITE_API_URL } = getEnvVariables();

const handleApi = axios.create({
    baseURL: VITE_API_URL,
    withCredentials: true 
});

export default handleApi;