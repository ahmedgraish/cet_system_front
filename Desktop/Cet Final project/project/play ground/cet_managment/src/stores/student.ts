import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { STUDENT_STORAGE } from '@/composables/usePersistStudent'
import studentApi from '@/repository/studentApi'
import type { authData } from '@/repository/studentApi'

export interface Student {
    id: number
    name: string
    ref_num: string
    email: string
    phone_number: string
    image: string
}

export interface Lectures {
    id: number
    subjectName: string
    startTime: string
    endTime: string
    absenseRatio: number
}

export interface StudentState {
    Data: Student
}
export const useStudentStore = defineStore(
    {
        id: 'student',

        state: (): StudentState => ({
            Data: JSON.parse(localStorage.getItem(STUDENT_STORAGE) as string) ?? {}
        }),

        getters: {
            studentInfo(): Student {
                return this.Data
            },

            loaded(): boolean {
                return this.Data.id != null
            }

        },

        actions: {
            async authStudent(data: authData) {
                studentApi.studentAuthentication(data)
            }
        },
    })
