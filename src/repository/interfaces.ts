
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
    id: number
    question: string
    options: string[]
}

export interface Quiz {
    id: number
    name: string
    note: string
    subject_name: string
    questions: Question[]
    done: boolean
    start_time: string
    end_time: string
}
export interface TransformedQuiz extends Omit<Quiz, 'start_time' | 'end_time'> {
    start_time: Date;
    end_time: Date;
}
export interface Answer {
    question_id: number
    answer: string
}
export interface SubmitAnswer {
    answers: Answer[]
}
export interface StudentAnswers {
    question: string
    options: string[]
    user_answer: string
    model_answer: string
    score: number
}
export interface Result {
    score: number,
    answers: StudentAnswers[]
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
