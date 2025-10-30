import axios from 'axios';
import {store} from '../redux/store';
import { signInSuccess, signInFailure } from '../redux/User/userSlice';

const axiosInstance = axios.create({
  baseURL: '/api',
});

// Request interceptor - attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.user.currentUser?.accessToken;
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshResponse = await axios.post('/api/auth/refresh', {}, {
          withCredentials: true // Important for sending cookies
        });

        const newAccessToken = refreshResponse.data.accessToken;

        // Update the access token in Redux store
        const state = store.getState();
        const updatedUser = {
          ...state.user.currentUser,
          accessToken: newAccessToken,
        };
        store.dispatch(signInSuccess(updatedUser));

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(signInFailure('Session expired. Please login again.'));
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;