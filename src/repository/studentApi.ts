import axios from "./axios";
import type { SubmitAnswer, Comment as cm } from "./interfaces";

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
    async submitStudentAnswer(quizId: number, data: SubmitAnswer) {
        const res = await axios().post(`/student/quizzes/${quizId}/answer`, data)
        return res
    },
    async getStudentResult(quizId: number) {
        const res = await axios().get(`/student/quizzes/${quizId}/result`)
        return res
    },
    async getStudentSubjects() {
        const res = await axios().get('/student/subject')
        return res
    },
    async getStudentHomeWorks(subjectId: number) {
        const res = await axios().get(`/student/subject/${subjectId}/homeworks`)
        return res
    },
    async addComment(homeworkId: number, data: cm) {
        const res = await axios().post(`/student/homeworks/${homeworkId}/comment`, data)
        return res
    },
    async uploadFiles(homeworkId: number, Data: File[]) {
        const formData = new FormData()
        Data.forEach(element => {
            formData.set('attachments[]', element)
        });
        const res = await axios().post(`/homeworks/${homeworkId}/answer`, formData)
        return res
    }


}