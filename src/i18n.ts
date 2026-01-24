import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import pt from "./i18n/pt.json"
import en from "./i18n/en.json"

i18n
  .use(LanguageDetector)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en }
    },
    fallbackLng: "pt",
    interpolation: { escapeValue: false }
  })

export default i18n
