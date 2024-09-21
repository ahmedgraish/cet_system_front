export interface AuthData {
    email: string
    password: string
}
export interface UpdateUser {
    name: string
    email: string
    phone: string
}
export interface LectureNote {
    lectureId: number
    note: string
}
export interface User {
    id: number
    name: string
    ref_number: string
    email: string
    phone_number: string
    image: string
}
export interface Group {
    id: number
    name: string
}

export interface Lecture {
    id: number
    subject_name: string
    start_time: string
    end_time: string
    absence_percentage: number
    day_of_week: number
}

export interface TeacherLecture {
    id: number
    subject_name: string
    group_name: string
    number_of_students: number
    start_time: string
    end_time: string
    day_of_week: number
}
export interface classRoomRetreveForm {
    start_time: string
    end_time: string
    day_of_week: number
}
export interface ClassRoom {
    id: number
    name: string
}
export interface NewLecture {
    start_time: string
    duration: number
    day_of_week: number
    subject_id: number
    class_room_id: number
    group_id: number
    lecture_date: string
    on_time_lecture: boolean
}

export interface Attendence {
    user_id: number
    status: number
}
export interface AttendenceList {
    date: string
    attendance: Attendence[]
}

export interface Question {
    id: number
    question: string
    options: string[]
    answer_index?: string
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
export interface teacherQuiz {
    id: number
    name: string
    note: string
    subject_name: string
    group_name: string
    start_time: string
    end_time: string
}
export interface teacherTransformedQuiz extends Omit<teacherQuiz, 'start_time' | 'end_time'> {
    start_time: Date;
    end_time: Date;
}
export interface StudentScoresTemp {
    user_id: number,
    ref_number: number,
    group_name: string
    user_name: string
    correct_answers_count: string
}
export interface QuizScoreTemp {
    answers: StudentScoresTemp[]
    total: number
}
export interface addNewQuiz {
    group_ids: number[]
    name: string
    note: string
    start_time: string
    end_time: string
    subject_id: number
    questions: Question[]
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
    teacher_name: string
    group_name: string
}

export interface Comment {
    user_name: string
    created_at: string
    content: string
}
export interface Attachment {
    name: string
    url: string
}
export interface HomeWork {
    id: number
    name: string
    description: string
    date: string
    comments: Comment[]
    attachments: Attachment[]
    student_attachments: Attachment[] | null | undefined
}
export interface TransformedHomeWork extends Omit<HomeWork, 'date' | 'comments'> {
    date: Date;
    comments: TransformedComment[];
}

export interface TransformedComment extends Omit<Comment, 'created_at'> {
    created_at: Date;
}