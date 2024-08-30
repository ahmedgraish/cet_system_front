
export interface Student {
    id: number
    name: string
    ref_num: string
    email: string
    phone_number: string
    image: string
}

export interface Lecture {
    id: number
    subject_name: string
    start_time: string
    end_time: string
    absence_percentage: number
    day_of_week: number
}

interface Question {
    id: string
    question: string
    options: string[]
}

export interface Quiz {
    id: number
    note: string
    subjectName: string
    questions: Question[]
    done: boolean
}

export interface Subject {
    id: number
    name: string
    teacherName: string
}

export interface Comment {
    userName: string
    date: Date
    content: string
}
export interface Attachment {
    name: string
    url: string
}
export interface HomeWork {
    id: string
    name: string
    descreption: string
    dueData: Date
    comments: Comment[]
    attachments: Attachment[]
}
