import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import { languages } from "@/i18n";
import { defaultLocale } from "@/i18n";
import {createI18n} from "vue-i18n";
import FlagIcon from 'vue-flag-icon'

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
app.mount('#app');