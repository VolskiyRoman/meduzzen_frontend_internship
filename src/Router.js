import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import UserProfile from "@/views/UserProfile.vue";
import CompanyProfile from "@/views/CompanyProfile.vue";
import SignUp from "@/views/SignUp.vue";
import LogIn from "@/views/LogIn.vue";
import UserList from "@/views/UserList.vue";
import CompanyList from "@/views/CompanyList.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/profile/user',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/profile/company',
    name: 'CompanyProfile',
    component: CompanyProfile,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/companies',
    name: 'CompanyList',
    component: CompanyList,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;