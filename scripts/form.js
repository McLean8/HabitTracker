import { getAllInputs, getCheckboxes, debounce } from './utils.js'
import { saveFormData } from './storage.js'

export function createDebouncedSaver(formId) {
  return debounce(() => saveFormData(formId), 500)
}

export function cleanupFormListeners(formId) {
  const form = document.getElementById(formId)
  if (!form) return

  const inputs = getAllInputs(form)
  const checkboxes = getCheckboxes(form)

  ;[...inputs, ...checkboxes].forEach(input => {
    input.replaceWith(input.cloneNode(true))
  })
}

export function setInputListener(formId) {
  const form = document.getElementById(formId)
  if (!form || !(form instanceof HTMLFormElement)) {
    console.error('Form not found or invalid')
    return
  }

  try {
    const debouncedSaver = createDebouncedSaver(formId)
    const inputs = getAllInputs(form)
    const checkboxes = getCheckboxes(form)

    ;[...inputs, ...checkboxes].forEach(input => {
      if (!input.id) {
        console.warn('Input element missing ID attribute')
        return
      }
      const eventType = input.type === 'checkbox' ? 'change' : 'input'
      input.addEventListener(eventType, debouncedSaver)
    })
  } catch (error) {
    console.error(`Error setting up input listener for formId: ${formId}`, error)
  }
}

export function clearAllFormData(formId) {
  localStorage.removeItem(`${formId}-data`)

  const form = document.getElementById(formId)
  if (!form) return

  const inputs = getAllInputs(form)
  inputs.forEach(input => {
    input.value = ''
  })

  const checkboxes = getCheckboxes(form)
  checkboxes.forEach(checkbox => {
    checkbox.checked = false
  })
}
