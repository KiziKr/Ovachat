import axios from 'axios';

const myaxios = axios.create({
    baseURL:'http://localhost:3001/api',
    config: {
        headers: {
            "Content-Type": "application/json"
        }
    }
})

export default myaxios