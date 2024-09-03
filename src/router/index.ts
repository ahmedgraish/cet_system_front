import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '../views/LandingPage.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/userInfo.vue')
    },
    {
      path: '/student/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/HomePage.vue')
    },
    {
      path: '/student/quizes',
      name: 'quizesPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/quizesPage.vue')
    },
    {
      path: '/student/quiz/:quizId/attempting',
      name: 'quizAttemptingPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/quizAttemptingPage.vue')
    },
    {
      path: '/student/quiz/:quizId/score',
      name: 'quizScore',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/quizScore.vue')
    },
    {
      path: '/student/quiz/:quizId/results',
      name: 'quizResults',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/quizResults.vue')
    },
    {
      path: '/student/subjects',
      name: 'subjectsListingPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/subjectsListingPage.vue')
    },
    {
      path: '/student/subject/:subjectId/homeWorks',
      name: 'homeWorksPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/homeWorksPage.vue')
    },
    {
      path: '/student/homework/:homeworkId/preview',
      name: 'homeWorkPreviewPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentViews/homeWorkPreviewPage.vue')
    },

  ]
})

export default router
