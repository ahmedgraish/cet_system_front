import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { STUDENT_STORAGE } from '@/composables/usePersistStudent'
import studentApi from '@/repository/studentApi'
import type { authData } from '@/repository/studentApi'

export interface Student {
    name: string
    ref_num: String
    email: String
    phone_number: String
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
                return {
                    ref_num: this.Data.ref_num,
                    name: this.Data.name,
                    email: this.Data.email,
                    phone_number: this.Data.phone_number,
                }
            },
            loaded(): boolean {
                return !(this.Data.ref_num === '')
            }

        },

        actions: {
            async authStudent(data: authData) {
                studentApi.studentAuthentication(data)
            }
        },
    })
