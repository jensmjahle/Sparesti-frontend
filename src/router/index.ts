import { createRouter, createWebHistory } from 'vue-router'
import FrontPageView from '@/views/FrontPageView.vue'
import HomePageView from '@/views/HomePageView.vue'
import HomeView from '@/views/HomePage/HomeView.vue'
import DiscoverView from '@/views/HomePage/DiscoverView.vue'
import MilestoneView from '@/views/HomePage/MilestoneView.vue'
import EconomyView from '@/views/HomePage/EconomyView.vue'
import ChallengeView from '@/views/HomePage/ChallengeView.vue'
import ProfileView from '@/views/HomePage/ProfileView.vue'
import LoginView from '@/views/FrontPage/LoginView.vue'
import SignupView from '@/views/FrontPage/SignupView.vue'
import RegisterPageView from '@/views/RegisterPageView.vue'
import StartView from '@/views/FrontPage/StartView.vue'
import CreateChallengeView from '@/views/HomePage/CreateChallengeView.vue'
import CreateMilestoneView from '@/views/HomePage/CreateMilestoneView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'front-page',
      component: FrontPageView,
      children: [
        {
          path: '',
          component: StartView
        },
        {
          path: 'login',
          component: LoginView
        },
        {
          path: 'signup',
          component: SignupView
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPageView,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePageView,
      children: [
        {
          path: '',
          component: HomeView
        },
        {
          path: 'home',
          component: HomeView
        },
        {
          path: 'discover',
          component: DiscoverView
        },
        {
          path: 'milestone',
          component: MilestoneView
        },
        {
          path: 'challenge',
          component: ChallengeView
        },
        {
          path: 'create-challenge',
          component: CreateChallengeView
        },
        {
          path: 'economy',
          component: EconomyView
        },
        {
          path: 'profile',
          component: ProfileView
        },
        {
          path: 'create-milestone',
          component: CreateMilestoneView
        }
      ]
    }
  ]
})
export default router
