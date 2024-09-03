import axios from 'axios'

console.log('url : ', import.meta.env)
const Token = localStorage.getItem('AUTHTOKEN') || ''
export default () => {

    return axios.create({
        baseURL: import.meta.env.VITE_URL_API,
        timeout: 2000,
        headers: {
            Authorization: `bearer ${Token}`,
        }
    })

}