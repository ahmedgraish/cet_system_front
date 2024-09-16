import { defineStore } from 'pinia'
import { TEACHER_STORAGE } from '@/composables/usePersistTeacher'
import studentApi from '@/repository/student/studentApi'
import type { User, Lecture, Subject, HomeWork, Quiz, Result, TransformedQuiz, SubmitAnswer, Comment as cm, AuthData, LectureNote, UpdateUser, TeacherLecture, NewLecture, AttendenceList, Group, classRoomRetreveForm, ClassRoom, teacherQuiz, teacherTransformedQuiz, StudentScoresTemp, QuizScoreTemp, StudentAnswers, addNewQuiz } from '@/repository/interfaces'
import { isAxiosError } from 'axios'
import teacherApi from '@/repository/teacher/teacherApi'

interface TeacherState {
    Data: User
    Lectures: TeacherLecture[]
    // lectureStudent: User[]
    Subjects: Subject[]
    HomeWorks: HomeWork[]
    Quizes: teacherQuiz[]
    Loading: boolean
    isAuthenticated: boolean

}



export const useTeacherStore = defineStore(
    {
        id: 'teacher',

        state: (): TeacherState => ({
            Data: JSON.parse(localStorage.getItem(TEACHER_STORAGE) as string)?.Data ?? {},
            Lectures: [],
            Subjects: JSON.parse(localStorage.getItem(TEACHER_STORAGE) as string)?.Subjects ?? [],
            HomeWorks: JSON.parse(localStorage.getItem(TEACHER_STORAGE) as string)?.HomeWorks ?? [],
            Quizes: JSON.parse(localStorage.getItem(TEACHER_STORAGE) as string)?.Quizes ?? [],
            Loading: false,
            isAuthenticated: JSON.parse(localStorage.getItem(TEACHER_STORAGE) as string)?.isAuthenticated ?? false,
        }),

        getters: {
            checkAuth(): boolean {
                return this.isAuthenticated
            },
            teacherInfo(): User {
                return this.Data
            },
            teacherLectures(): TeacherLecture[] {
                return this.Lectures
            },
            teacherSubjects(): Subject[] {
                return this.Subjects
            },
            studentHomeWorks(): HomeWork[] {
                return this.HomeWorks;
            },
            teacherQuizes(): teacherTransformedQuiz[] {
                return this.Quizes.map(quiz => ({
                    ...quiz,
                    start_time: new Date(quiz.start_time),
                    end_time: new Date(quiz.end_time),
                }));
            },

            isLoading(): boolean {
                return this.Loading
            }
        },

        actions: {
            async authTeacher(data: AuthData) {
                try {
                    this.Loading = true;
                    const response = await teacherApi.authenticateTeacher(data)
                    localStorage.setItem('TEACHERAUTHTOKEN', response.data.token)
                    this.Data = response.data.user
                    this.isAuthenticated = true
                    return response
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            },
            async updateStudent(data: UpdateUser) {
                try {
                    this.Loading = true;
                    const response = await studentApi.updateStudentInfo(data)
                    this.Data = response.data.user
                    return response
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            },
            async getTeacherLectures() {
                try {
                    this.Loading = true
                    const response = await teacherApi.getLectures()
                    this.Lectures = response.data

                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            },
            async getLectureStudents(lectureId: number): Promise<User[]> {
                try {
                    this.Loading = true;
                    const response = await teacherApi.getLectureStudents(lectureId);
                    return response.data as User[];  // Ensure the return of User[] on success
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                    }
                    throw error;  // Re-throw the error to ensure function fails with an error
                } finally {
                    this.Loading = false;
                }
            },
            async submitAttendence(attendenceData: AttendenceList, lectureId: number) {
                try {
                    this.Loading = true
                    const response = await teacherApi.submitLectureAttendence(attendenceData, lectureId)
                    console.log(response.data);
                    return response
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            },

            async getSubjectGroups(subjectId: number): Promise<Group[]> {
                try {
                    this.Loading = true;
                    const response = await teacherApi.getSubjectGroups(subjectId);
                    console.log(response.data);
                    return response.data
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                    }
                    throw error;  // Re-throw the error to ensure function fails with an error
                } finally {
                    this.Loading = false;
                }
            },
            async getAvialableClassRooms(data: classRoomRetreveForm): Promise<ClassRoom[]> {
                try {
                    this.Loading = true;
                    const response = await teacherApi.getAvailbleClassRoi(data);
                    console.log(response.data);
                    return response.data
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                    }
                    throw error;  // Re-throw the error to ensure function fails with an error
                } finally {
                    this.Loading = false;
                }
            },
            async addNewLecture(lectureData: NewLecture) {
                try {
                    this.Loading = true;
                    const response = await teacherApi.addNewLecture(lectureData);
                    console.log(response.data);
                    return response
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                    }
                    throw error;  // Re-throw the error to ensure function fails with an error
                } finally {
                    this.Loading = false;
                }
            },
            async getTeacherQuizes() {
                try {
                    this.Loading = true
                    const response = await teacherApi.getQuizes()
                    this.Quizes = response.data
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            },
            async getQuizScores(quizId: number): Promise<QuizScoreTemp> {
                try {
                    this.Loading = true
                    const response = await teacherApi.getStudentsQuizScores(quizId)
                    return response.data
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                    }
                    throw error;  // Re-throw the error to ensure function fails with an error
                } finally {
                    this.Loading = false;
                }
            },
            async getStudentsResults(quizId: number, userId: number): Promise<StudentAnswers[]> {
                try {
                    this.Loading = true
                    const response = await teacherApi.getStudentsQuizAnswers(quizId, userId)
                    return response.data
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                    }
                    throw error;  // Re-throw the error to ensure function fails with an error
                } finally {
                    this.Loading = false;
                }
            },
            async addNewQuiz(quizData: addNewQuiz) {
                try {
                    this.Loading = true
                    const response = await teacherApi.addNewQuiz(quizData)
                    console.log(response.data);
                    return response.data
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                    }
                    throw error;  // Re-throw the error to ensure function fails with an error
                } finally {
                    this.Loading = false;
                }
            },
            async getTeacherSubjects() {
                try {
                    this.Loading = true
                    const response = await teacherApi.getSubjects()
                    this.Subjects = response.data
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            },
            async getSubjectHomeWorks(subjectId: number) {
                try {
                    this.Loading = true
                    const response = await studentApi.getStudentHomeWorks(subjectId)
                    this.HomeWorks = response.data
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            },
            async addNewComment(homeworkId: number, data: cm) {
                try {
                    this.Loading = true
                    const response = await studentApi.addComment(homeworkId, data)
                    console.log(response.data);
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            },
            async uploadHomework(homeworkId: number, data: File[]) {
                try {
                    this.Loading = true
                    const response = await studentApi.uploadFiles(homeworkId, data)
                    console.log(response.data);
                    return response
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            }
        },
    })
