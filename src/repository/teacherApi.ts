import axios from "./axios";
import type { AttendenceList, AuthData, NewLecture, SubmitAnswer, UpdateUser, classRoomRetreveForm, Comment as cm } from "./interfaces";

export default {


    async authenticateTeacher(Data: AuthData) {
        const res = await axios().post('teacher/login', Data);
        return res;
    },
    async updateTeacherInfo(info: UpdateUser) {
        const res = await axios().put('/teacher/update', info);
        return res;
    },
    async getLectures() {
        const res = await axios().get('/teacher/lectures');
        return res;
    },
    async getLectureStudents(lectureId: number) {
        const res = await axios().get(`/lecture-students/${lectureId}`);
        return res;
    },
    async submitLectureAttendence(attendenceData: AttendenceList, lectureId: number) {
        const res = await axios().post(`/teacher/attendance/${lectureId}`, attendenceData);
        return res;
    },

    async getSubjectGroups(subjectId: number) {
        const res = await axios().get(`/teacher/subjects/${subjectId}/groups`)
        return res
    },
    async getAvailbleClassRoi(data: classRoomRetreveForm) {
        const res = await axios().get('/teacher/available-classrooms', {
            params: {
                day_of_week: data.day_of_week,  // Use values from data object
                start_time: data.start_time,
                end_time: data.end_time
            }
        });
        return res
    },
    async addNewLecture(lectureData: NewLecture) {
        const res = await axios().post('/teacher/lectures', lectureData)
        return res
    },
    async getSubjects() {
        const res = await axios().get('/teacher/subjects')
        return res
    },
    async getQuizes() {
        //
        const res = await axios().get('/student/quizzes');
        return res
    },
    async getStudentResult(quizId: number) {
        //
        const res = await axios().get(`/student/quizzes/${quizId}/result`)
        return res
    },

    async getHomeWorks(subjectId: number) {
        //
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
            formData.append('attachments[]', element)
        });
        const res = await axios().post(`/homeworks/${homeworkId}/answer`, formData)
        return res
    }
}