import teacherAxios from "./teacherAxios";
import type { AttendenceList, AuthData, NewLecture, UpdateUser, addNewQuiz, classRoomRetreveForm, Comment as cm } from "@/repository/interfaces";

export default {


    async authenticateTeacher(Data: AuthData) {
        const res = await teacherAxios().post('teacher/login', Data);
        return res;
    },
    async updateTeacherInfo(info: UpdateUser) {
        const res = await teacherAxios().put('/teacher/update', info);
        return res;
    },
    async getLectures() {
        const res = await teacherAxios().get('/teacher/lectures');
        return res;
    },
    async getLectureStudents(lectureId: number) {
        const res = await teacherAxios().get(`/lecture-students/${lectureId}`);
        return res;
    },
    async submitLectureAttendence(attendenceData: AttendenceList, lectureId: number) {
        const res = await teacherAxios().post(`/teacher/attendance/${lectureId}`, attendenceData);
        return res;
    },

    async getSubjectGroups(subjectId: number) {
        const res = await teacherAxios().get(`/teacher/subjects/${subjectId}/groups`)
        return res
    },
    async getAvailbleClassRoi(data: classRoomRetreveForm) {
        const res = await teacherAxios().get('/teacher/available-classrooms', {
            params: {
                day_of_week: data.day_of_week,  // Use values from data object
                start_time: data.start_time,
                end_time: data.end_time
            }
        });
        return res
    },
    async addNewLecture(lectureData: NewLecture) {
        const res = await teacherAxios().post('/teacher/lectures', lectureData)
        return res
    },
    async getSubjects() {
        const res = await teacherAxios().get('/teacher/subjects')
        return res
    },
    async getQuizes() {
        const res = await teacherAxios().get('/teacher/quizzes');
        return res
    },
    async getStudentsQuizScores(quizId: number) {
        const res = await teacherAxios().get(`/teacher/quiz-results/${quizId}`)
        return res
    },
    async getStudentsQuizAnswers(quizId: number, userId: number) {
        const res = await teacherAxios().get(`/teacher/quiz/${quizId}/users/${userId}/result`)
        return res
    },
    async addNewQuiz(quizData: addNewQuiz) {
        const res = await teacherAxios().post('/teacher/quizzes', quizData)
        return res
    },
    async getHomeWorks(subjectId: number) {
        //
        const res = await teacherAxios().get(`/student/subject/${subjectId}/homeworks`)
        return res
    },
    async addComment(homeworkId: number, data: cm) {
        const res = await teacherAxios().post(`/student/homeworks/${homeworkId}/comment`, data)
        return res
    },
    async uploadFiles(homeworkId: number, Data: File[]) {
        const formData = new FormData()
        Data.forEach(element => {
            formData.append('attachments[]', element)
        });
        const res = await teacherAxios().post(`/homeworks/${homeworkId}/answer`, formData)
        return res
    }
}