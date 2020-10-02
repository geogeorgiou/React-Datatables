import axios from 'axios';

const JSON = true;

const HTTP = axios.create({
    baseURL: 'https://localhost:3000/api',
    timeout: 3000,
    responseType: 'json',
    validateStatus: status => status >= 200 && status<=401
})