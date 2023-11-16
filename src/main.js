import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'vue3-toastify/dist/index.css'
import { languages } from "@/i18n";
import { defaultLocale } from "@/i18n";
import {createI18n} from "vue-i18n";
import FlagIcon from 'vue-flag-icon'
import Vue3Toastify, {toast} from "vue3-toastify";

import { createStore } from 'vuex';
import authModule from "@/store/modules/authModule";
import testModule from "@/store/modules/testModule";
import userModule from "@/store/modules/userModule";

const store = createStore({
    modules: {
        testModule,
        authModule,
        userModule
    },
});

export default store

const app = createApp(App);
app.use(router);
const messages = Object.assign(languages)
export const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages,
    globalInjection: true
})
app.use(FlagIcon)
app.use(i18n)
app.use(store);
app.use(Vue3Toastify, {
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER
})
app.mount('#app');

