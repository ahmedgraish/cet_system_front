import axios from "./axios";

export interface authData {
    userName: string
    password: string
}
export default {

    studentAuthentication(Data: authData) {
        return axios().post('', Data)
            .then((res) => {
                return res.data
            })
    }

}