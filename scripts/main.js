import { setTheme, toggleTheme } from './theme.js'
import { populateFormData } from './storage.js'
import { setInputListener, clearAllFormData } from './form.js'
import { updateWeekProgress, updateResetTimer, scheduleWeeklyClear } from './progress.js'

const THEME_DEFAULT = 'light'
let resetTimerInterval

const initializeFormData = () => {
  document.querySelectorAll('form').forEach(form => {
    if (form.id) {
      setInputListener(form.id)
      populateFormData(form.id)
    }
  })
}

const initializeProgress = () => {
  updateWeekProgress()
  updateResetTimer()
  resetTimerInterval = setInterval(updateResetTimer, 1000)
  scheduleWeeklyClear()
}

const initializeTheme = () => {
  setTheme(localStorage.getItem('theme') || THEME_DEFAULT)
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme)
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme()
  initializeProgress()
  initializeFormData()
})
