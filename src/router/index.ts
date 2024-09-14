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
      path: '/settings',
      name: 'userSettings',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/userInfo.vue')
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
      path: '/teacher/home',
      name: 'teacherHome',

      component: () => import('../views/teacherViews/homePage.vue')
    },
    {
      path: '/teacher/lecture/id/attendance',
      name: 'studentAttendance',

      component: () => import('../views/teacherViews/studentAttendance.vue')
    },
    {
      path: '/teacher/subjects',
      name: 'teacherSubjects',

      component: () => import('../views/teacherViews/teacherSubjects.vue')
    },
    {
      path: '/teacher/subject/:subjectId/homeWorks',
      name: 'teacherHomeworkPage',

      component: () => import('../views//teacherViews/teacherHomeworkPage.vue')
    },
    {
      path: '/teacher/homework/:homeworkId/preview',
      name: 'teacherHomeworkPreview',

      component: () => import('../views//teacherViews/teacherHomeworkPreview.vue')
    },
    {
      path: '/teacher/homework/:homeworkId/submission',
      name: 'homeworksubmissionpage',

      component: () => import('../views//teacherViews/homeworkSubmissionpage.vue')
    },
    {
      path: '/teacher/quizzes',
      name: 'teacherQuizzes',

      component: () => import('../views//teacherViews/teacherQuizPage.vue')
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