import { createRouter, createWebHistory } from 'vue-router';
import authModule from "@/store/modules/authModule";
const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import("@/views/SignUp.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import("@/views/LogIn.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'MyProfile',
    component: () => import("@/views/MyProfile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/my-companies',
    name: 'MyCompanies',
    component: () => import("@/views/CompanyList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'UserList',
    component: () => import("@/views/UserList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/users/:userId',
    name: 'UsersProfile',
    component: () => import("@/views/UserProfile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/companies',
    name: 'CompanyList',
    component: () => import("@/views/CompanyList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/company/:id',
    name: 'CompanyProfile',
    component: () => import("@/views/CompanyProfile.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/vuextest',
    name: 'VuexTest',
    component: () => import("@/components/testVuex.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = authModule.state.status.loggedIn;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'LogIn' });
  } else {
    next();
  }
});

export default router;