import axios from 'axios'
import { baseURL } from '../config';

export const $auth = axios.create({
    withCredentials: true,
    baseURL: `${baseURL}/api/auth/`,
});

export const $api = axios.create({
    baseURL: `${baseURL}/api/`,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken')
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;

    console.log(error)
    if (Number(error.response.status) === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        await $auth.post('refresh', {})
            .then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken);
            })
            .catch(e => {
                document.location.replace(`http://${window.location.host}`);
                localStorage.removeItem('accessToken')
            })

        return $api.request(originalRequest);
    }
    throw new Error('UPS')
})