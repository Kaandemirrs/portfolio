import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from './locales/de'
import en from './locales/en'
import tr from './locales/tr'

const storageKey = 'portfolio:lang'
const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null
const initialLanguage = savedLanguage || 'tr'

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
    de: { translation: de },
  },
  lng: initialLanguage,
  fallbackLng: 'tr',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (language) => {
  try {
    localStorage.setItem(storageKey, language)
  } catch {
    return
  }
})

export default i18n
