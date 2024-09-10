import { defineStore } from 'pinia'
import { STUDENT_STORAGE } from '@/composables/usePersistStudent'
import studentApi from '@/repository/studentApi'
import type { Student, Lecture, Subject, HomeWork, Quiz, Result, TransformedQuiz, SubmitAnswer, Comment as cm, AuthData, LectureNote, UpdateUser } from '@/repository/interfaces'
import { isAxiosError } from 'axios'

interface StudentState {
    Data: Student
    Lectures: Lecture[]
    Subjects: Subject[]
    HomeWorks: HomeWork[]
    Quizes: Quiz[]
    Answers: Result | null
    lectureNote: LectureNote[]
    Loading: boolean
    isAuthenticated: boolean

}



export const useStudentStore = defineStore(
    {
        id: 'student',

        state: (): StudentState => ({
            Data: JSON.parse(localStorage.getItem(STUDENT_STORAGE) as string)?.Data ?? {},
            Lectures: [],
            Subjects: JSON.parse(localStorage.getItem(STUDENT_STORAGE) as string)?.Subjects ?? [],
            HomeWorks: JSON.parse(localStorage.getItem(STUDENT_STORAGE) as string)?.HomeWorks ?? [],
            Quizes: JSON.parse(localStorage.getItem(STUDENT_STORAGE) as string)?.Quizes ?? [],
            Answers: null,
            lectureNote: JSON.parse(localStorage.getItem(STUDENT_STORAGE) as string)?.lectureNote ?? [],
            Loading: false,
            isAuthenticated: JSON.parse(localStorage.getItem(STUDENT_STORAGE) as string)?.isAuthenticated ?? false,
        }),

        getters: {
            checkAuth(): boolean {
                return this.isAuthenticated
            },
            studentInfo(): Student {
                return this.Data
            },
            studentLectures(): Lecture[] {
                return this.Lectures
            },
            lecturesNotes(): LectureNote[] {
                return this.lectureNote
            },
            studentSubjects(): Subject[] {
                return this.Subjects
            },
            studentHomeWorks(): HomeWork[] {
                return this.HomeWorks;
            },
            studentQuizes(): TransformedQuiz[] {
                return this.Quizes.map(quiz => ({
                    ...quiz,
                    start_time: new Date(quiz.start_time),
                    end_time: new Date(quiz.end_time),
                }));
            },
            studentAnswers(): Result | null {
                return this.Answers
            },
            isLoading(): boolean {
                return this.Loading
            }
        },

        actions: {
            async authStudent(data: AuthData) {
                try {
                    this.Loading = true;
                    const response = await studentApi.authenticateStudent(data)
                    localStorage.setItem('AUTHTOKEN', response.data.token)
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
                    const response = await studentApi.updateUserInfo(data)
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
            async getStudentLectures() {
                try {
                    this.Loading = true
                    const response = await studentApi.studentLectures()
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
            addLectureNote(id: number, note: string) {
                console.log(id);
                if (this.lecturesNotes.find(lec => lec.lectureId === id)) {
                    this.lectureNote = this.lecturesNotes.filter(lec => lec.lectureId !== id)
                }
                this.lectureNote.push({
                    lectureId: id,
                    note: note
                })
            },
            async getStudentQuizes() {
                try {
                    this.Loading = true
                    const response = await studentApi.studentQuizes()
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
            async submitAnswer(quizId: number, data: SubmitAnswer) {
                try {
                    this.Loading = true
                    const response = await studentApi.submitStudentAnswer(quizId, data)
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
            async studentResult(quizId: number) {
                try {
                    this.Loading = true
                    const response = await studentApi.getStudentResult(quizId)
                    this.Answers = response.data
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.message);
                        throw error
                    }
                } finally {
                    this.Loading = false
                }
            },
            async getStudentSubjects() {
                try {
                    this.Loading = true
                    const response = await studentApi.getStudentSubjects()
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
