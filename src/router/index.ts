import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '../views/LandingPage.vue'
import { useStudentStore } from '@/stores/student'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: landingPage
    },
    {
      path: '/student/signIn',
      name: 'signIn',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/student/info',
      name: 'studentInfo',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/studentInfo.vue')
    },
    {
      path: '/student/home',
      name: 'home',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/HomePage.vue')
    },
    {
      path: '/student/quizes',
      name: 'quizesPage',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/quizesPage.vue')
    },
    {
      path: '/student/quiz/:quizId/attempting',
      name: 'quizAttemptingPage',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/quizAttemptingPage.vue')
    },
    {
      path: '/student/quiz/:quizId/score',
      name: 'quizScore',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/quizScore.vue')
    },
    {
      path: '/student/quiz/:quizId/results',
      name: 'quizResults',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/quizResults.vue')
    },
    {
      path: '/student/subjects',
      name: 'subjectsListingPage',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/subjectsListingPage.vue')
    },
    {
      path: '/student/subject/:subjectId/homeWorks',
      name: 'homeWorksPage',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/homeWorksPage.vue')
    },
    {
      path: '/student/homework/:homeworkId/preview',
      name: 'homeWorkPreviewPage',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/homeWorkPreviewPage.vue')
    },
    {
      path: '/teacher/signIn',
      name: 'teacherSignIn',
      component: () => import('../views/teacherViews/teacherSignIn.vue')
    },
    {
      path: '/teacher/info',
      name: 'teacherInfo',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/teacherViews/teacherInfo.vue')
    },
    {
      path: '/teacher/home',
      name: 'teacherHome',
      meta: { requiresAuth: true },
      component: () => import('../views/teacherViews/homePage.vue')
    },
    {
      path: '/teacher/lecture/:lectureId/attendance',
      name: 'studentAttendance',
      meta: { requiresAuth: true },
      component: () => import('../views/teacherViews/studentAttendance.vue')
    },
    {
      path: '/teacher/subjects',
      name: 'teacherSubjects',
      meta: { requiresAuth: true },
      component: () => import('../views/teacherViews/teacherHomeworkGroups.vue')
    },
    {
      path: '/teacher/subject/:subjectId/group/:groupId/homeWorks',
      name: 'teacherHomeworkPage',
      meta: { requiresAuth: true },

      component: () => import('../views//teacherViews/teacherHomeworkPage.vue')
    },
    {
      path: '/teacher/group/:groupId/homework/:homeworkId/preview',
      name: 'teacherHomeworkPreview',
      meta: { requiresAuth: true },

      component: () => import('../views//teacherViews/teacherHomeworkPreview.vue')
    },
    {
      path: '/teacher/group/:groupId/homework/:homeworkId/submission',
      name: 'homeworksubmissionpage',
      meta: { requiresAuth: true },

      component: () => import('../views//teacherViews/homeworkSubmissionpage.vue')
    },
    {
      path: '/teacher/quizzes',
      name: 'teacherQuizzes',
      meta: { requiresAuth: true },

      component: () => import('../views//teacherViews/teacherQuizPage.vue')
    },
    {
      path: '/teacher/quiz/:quizId/preview',
      name: 'teacherQuizPreview',
      meta: { requiresAuth: true },

      component: () => import('../views//teacherViews/teacherQuizPreview.vue')
    },
    {
      path: '/teacher/quiz/:quizId/student/:studentId/results',
      name: 'teacherQuizResultPreview',
      meta: { requiresAuth: true },

      component: () => import('../views/teacherViews/quizResultsPreview.vue')
    },
  ]
})
// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const studentStore = useStudentStore()

  if (to.meta.requiresAuth && !studentStore.checkAuth) {
    // If the route requires authentication and the user is not authenticated
    next({ name: 'signIn' }) // Redirect to the sign-in page
  } else {
    next() // Allow navigation
  }
})

export default router