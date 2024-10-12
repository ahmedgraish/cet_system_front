import router from '@/router'
import axios from 'axios'

export default () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_URL_API,
        // baseURL: 'http://127.0.0.1:8000/api/'
        // No need to set Authorization header here, we'll handle it dynamically
    })

    // Add a request interceptor to dynamically set the auth token
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('AUTHTOKEN') || ''
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, error => {
        return Promise.reject(error)
    })

    // Add a response interceptor to handle 401 errors
    instance.interceptors.response.use(
        response => response, // Return the response if successful
        error => {
            // Check if the error response has a 401 status code
            if (error.response && error.response.status === 401) {
                // Redirect to the sign-in page
                router.push({ name: 'signIn' })
            }
            return Promise.reject(error) // Reject the promise to handle the error in the request call
        }
    )

    return instance
}
