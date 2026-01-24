import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'
import i18n from "./i18n"

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)

    fullList.addItem(newItem)
    template.render(fullList)

    input.value = ""
  })

  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement
  clearItems.addEventListener("click", (): void => {
    if (confirm(i18n.t("clearConfirm"))) {
      fullList.clearList()
      template.clear()
    }
  })

  /* ===== I18N AUTO UPDATE ===== */
  const updateContent = (): void => {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n")
      if (key) el.textContent = i18n.t(key)
    })

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder")
      if (key && el instanceof HTMLInputElement) {
        el.placeholder = i18n.t(key)
      }
    })
  }

  i18n.on("languageChanged", updateContent)
  updateContent()

  /* ===== BOTÕES DE IDIOMA ===== */
  document.getElementById("langPT")?.addEventListener("click", () => {
    i18n.changeLanguage("pt")
  })

  document.getElementById("langEN")?.addEventListener("click", () => {
    i18n.changeLanguage("en")
  })

  fullList.load()
  template.render(fullList)
}

document.addEventListener("DOMContentLoaded", initApp)
