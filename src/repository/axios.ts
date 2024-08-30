import axios from 'axios'

console.log('url : ', import.meta.env)
export default () => {

    return axios.create({
        baseURL: import.meta.env.VITE_URL_API,
        // baseURL: 'https://moaad.ly/api',
        timeout: 2000
    })

}