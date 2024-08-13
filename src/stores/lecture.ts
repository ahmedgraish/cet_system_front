import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Lecture {
    id: number
    subjectName: string
    dayOfWeek: string
    startTime: string
    endTime: string
    numberOfStudents?: string
    absenseRatio?: number
}

export interface LectureState {
    Data: Lecture[]
}

export const useLectureStore = defineStore(
    {
        id: 'lecture',

        state: (): LectureState => ({
            Data: []
        }),

        getters: {

            lecturesInfo(): Lecture[] {
                return this.Data

            },

            loaded(): boolean {
                return this.Data.length > 0
            }
        },

        actions: {
        },
    })
