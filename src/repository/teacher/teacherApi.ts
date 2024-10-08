import teacherAxios from "./teacherAxios";
import type { AttendenceList, AuthData, NewHomework, NewLecture, UpdateUser, addNewQuiz, classRoomRetreveForm, Comment as cm } from "@/repository/interfaces";

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
    async getHomeWorks(subjectId: number, groupId: number) {
        const res = await teacherAxios().get(`/teacher/groups/${groupId}/subjects/${subjectId}/homeworks`)
        return res
    },
    async getHomeworkGroups() {
        const res = await teacherAxios().get(`/teacher/homeworks`)
        return res
    },
    async getHomeworksubmissions(homeworkId: number, groupId: number) {
        const res = await teacherAxios().get(`/teacher/homeworks/${homeworkId}/groups/${groupId}/answers`)
        return res
    },
    async addHomework(data: NewHomework) {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('subject_id', data.subject_id.toString())
        formData.append('due_time', data.due_time || '')
        data.group_ids.forEach(element => {
            formData.append('group_ids[]', element.toString())
        })
        data.attachments.forEach(element => {
            formData.append('attachments[]', element)
        });
        const res = await teacherAxios().post('/teacher/homeworks', formData)
        return res
    },

    async addComment(homeworkId: number, data: cm) {
        const res = await teacherAxios().post(`/teacher/homeworks/${homeworkId}/comment`, data)
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