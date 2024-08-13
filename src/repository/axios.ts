import axios from 'axios'

console.log('url : ', import.meta.env)
export default () => {

    return axios.create({
        // baseURL: import.meta.env.VITE_URL_API,
        baseURL: '',
        timeout: 2000
    })

}