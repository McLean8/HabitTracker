export function getAllInputs(form) {
  if (!(form instanceof HTMLFormElement)) {
    throw new Error('Invalid form element provided')
  }
  return form.querySelectorAll('input:not([type="checkbox"]), textarea')
}

export function getCheckboxes(form) {
  return form.querySelectorAll('input[type="checkbox"]')
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function isValidFormData(formData) {
  return formData && typeof formData === 'object' && !Array.isArray(formData)
}
