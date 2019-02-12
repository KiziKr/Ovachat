import axios from 'axios';

export const myaxios = axios.create({
    baseURL:'http://localhost:3001/api',
    responseType: 'json',
    headers: {
        "Content-Type": "application/json"
    }
})