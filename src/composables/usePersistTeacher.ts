import { useTeacherStore } from '@/stores/teacher'
import { onUnmounted } from 'vue'
export const TEACHER_STORAGE = 'TEACHER_STORAGE'

export function usePersistTeacher() {
    const teacherStore = useTeacherStore()

    const unsub = teacherStore.$subscribe(() => {
        localStorage.setItem(TEACHER_STORAGE, JSON.stringify(teacherStore.$state))
    })

    onUnmounted(() => {
        unsub()
    })
}
