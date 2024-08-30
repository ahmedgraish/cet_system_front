import axios from "./axios";

export interface authData {
    userName: string
    password: string
}
export default {

    async authenticateStudent(Data: authData) {
        const res = await axios().post('', Data);
        return res;
    },
    async studentLectures() {
        const res = await axios().get('/student/lectures');
        return res;
    },
    async studentQuizes() {
        const res = await axios().get('/student/quizzes');
        return res
    },

}