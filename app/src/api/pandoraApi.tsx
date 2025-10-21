import axios from "axios";

export const pandorApi = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
