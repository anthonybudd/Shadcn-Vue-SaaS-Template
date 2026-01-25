import axios, { type AxiosInstance } from 'axios';

class Service {

    JWT: string;
    axios: AxiosInstance;

    constructor(JWT: string) {
        this.JWT = JWT;

        this.axios = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            headers: {
                Authorization: `Bearer ${JWT}`,
            }
        });
    }
}

export default Service;
