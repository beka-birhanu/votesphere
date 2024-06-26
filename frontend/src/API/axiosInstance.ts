import axios from 'axios';

const UNAUTHORIZED = 401;
const SERVER_ERROR_START = 500;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000',
    headers: {
        'Content-Type': 'application/json',
    },
});

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
        const response = await axios.get('auth/refresh-token', {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        const { newAccessToken } = response.data;
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken; // Return the new access token
    } catch (error) {
        throw error;
    }
}

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check for network error
        if (!error.response || error.response.status === SERVER_ERROR_START) {
            console.error('Network error:', error);
            localStorage.setItem('previousURL', window.location.pathname + window.location.search);
            window.location.href = '/network-error'; // Redirect to fault page
            return;
        }

        // Handle unauthorized error
        if (error.response.status === UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
