import { defineStore } from 'pinia'
import { STUDENT_STORAGE } from '@/composables/usePersistStudent'
import studentApi from '@/repository/studentApi'
import type { authData } from '@/repository/studentApi'
import type { Student, Lecture, Subject, HomeWork, Quiz } from '@/repository/interfaces'
import { isAxiosError } from 'axios'

interface StudentState {
    Data: Student
    Lectures: Lecture[]
    Subjects: Subject[]
    HomeWorks: HomeWork[]
    Quizes: Quiz[]
    Loading: boolean
}

export const useStudentStore = defineStore(
    {
        id: 'student',

        state: (): StudentState => ({
            Data: JSON.parse(localStorage.getItem(STUDENT_STORAGE) as string) ?? {},
            Lectures: [],
            Subjects: [],
            HomeWorks: [],
            Quizes: [],
            Loading: false,
        }),

        getters: {
            studentInfo(): Student {
                return this.Data
            },
            studentLectures(): Lecture[] {
                return this.Lectures
            },
            studentSubjects(): Subject[] {
                return this.Subjects
            },
            studentHomeWorks(): HomeWork[] {
                return this.HomeWorks
            },
            studentQuizes(): Quiz[] {
                return this.Quizes
            },
            isLoading(): boolean {
                return this.Loading
            }
        },

        actions: {
            async authStudent(data: authData) {
                try {
                    this.Loading = true;
                    await studentApi.authenticateStudent(data)

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
        },
    })
