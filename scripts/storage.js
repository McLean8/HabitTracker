import { getAllInputs, getCheckboxes, isValidFormData } from './utils.js'

export function checkStorageSpace() {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length
    }
  }
  const remainingSpace = 5242880 - total

  if (remainingSpace < 524288) {
    console.warn(`Local storage space is running low: ${Math.round(remainingSpace / 1024)}KB remaining`)
  }
}

export function populateFormData(formId) {
  if (!formId || typeof formId !== 'string') {
    throw new Error('Invalid form ID provided')
  }

  const key = `${formId}-data`
  const storedData = localStorage.getItem(key)

  try {
    if (!storedData) return

    const formData = JSON.parse(storedData)
    if (!isValidFormData(formData)) {
      throw new Error('Invalid form data structure')
    }

    Object.entries(formData).forEach(([fieldName, value]) => {
      const element = document.getElementById(fieldName)
      if (!element) {
        console.warn(`Element with id ${fieldName} not found`)
        return
      }

      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        if (element.type === 'checkbox') {
          element.checked = Boolean(value)
        } else {
          element.value = String(value)
        }
      }
    })
  } catch (error) {
    console.error(`Error populating form data for formId: ${formId}`, error)
    localStorage.removeItem(key)
  }
}

export function saveFormData(formId) {
  checkStorageSpace()
  const form = document.getElementById(formId)
  if (!form || !(form instanceof HTMLFormElement)) {
    throw new Error('Invalid form element')
  }

  try {
    const formData = {}
    const inputs = getAllInputs(form)
    const checkboxes = getCheckboxes(form)

    inputs.forEach(input => {
      if (input.id) {
        formData[input.id] = input.value.trim()
      }
    })

    checkboxes.forEach(checkbox => {
      if (checkbox.id) {
        formData[checkbox.id] = checkbox.checked
      }
    })

    const key = `${formId}-data`
    localStorage.setItem(key, JSON.stringify(formData))
    return true
  } catch (error) {
    console.error(`Error saving form data for formId: ${formId}`, error)
    return false
  }
}
