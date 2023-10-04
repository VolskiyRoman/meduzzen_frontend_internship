import en from './en.json'
import ua from './ua.json'
import {i18n} from "@/main";
export let defaultLocale = localStorage.getItem('selectedLanguage') || 'en';
export const languages = {
    en,
    ua
}
export function setLanguage(locale) {
    i18n.global.locale.value = locale;
    localStorage.setItem('selectedLanguage', locale)
}
