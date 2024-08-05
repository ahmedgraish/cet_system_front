import { useStudentStore } from '@/stores/student'
import { onUnmounted } from 'vue'
export const STUDENT_STORAGE = 'STUDENT_STORAGE'

export function usePersistStudent() {
  const studentStore = useStudentStore()

  const unsub = studentStore.$subscribe(() => {
    localStorage.setItem(STUDENT_STORAGE, JSON.stringify(studentStore.$state))
  })

  onUnmounted(() => {
    unsub()
  })
}
