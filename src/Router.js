import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/profile/user',
    name: 'UserProfile',
    component: () => import("@/views/UserProfile.vue"),
  },
  {
    path: '/profile/company',
    name: 'CompanyProfile',
    component: () => import("@/views/CompanyProfile.vue"),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import("@/views/LogIn.vue"),
  },
  {
    path: '/users',
    name: 'UserList',
    component: () => import("@/views/UserList.vue"),
  },
  {
    path: '/companies',
    name: 'CompanyList',
    component: () => import("@/views/CompanyList.vue"),
  },
  {
    path: '/vuextest',
    name: 'VuexTest',
    component: () => import("@/components/testVuex.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;