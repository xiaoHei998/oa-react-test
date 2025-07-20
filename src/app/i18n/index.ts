import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const modules = import.meta.glob('./locales/*.json', { eager: true, as: 'json' }) as Record<string, object>

const resourcesArr = Object.entries(modules).map(([path, module]) => {
  const key = path.split('/').pop()?.split('.').shift()
  return [key, module]
})

export const resources = Object.fromEntries(resourcesArr)

console.log(resources, 'resources')

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "en", 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
