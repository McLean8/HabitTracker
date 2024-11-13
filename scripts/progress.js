import { clearAllFormData } from './form.js'

export function updateWeekProgress() {
  const now = new Date()
  const day = now.getDay()
  const progressElement = document.getElementById('weekProgress')

  const adjustedDay = day === 0 ? 7 : day
  const progress = ((adjustedDay - 1) / 6) * 100

  if (progressElement) {
    progressElement.style.width = `${progress}%`
  }
}

export function scheduleWeeklyClear() {
  const now = new Date()
  const nextSunday = new Date()

  nextSunday.setDate(now.getDate() + (7 - now.getDay()))
  nextSunday.setHours(0, 0, 0, 0)

  if (nextSunday <= now) {
    nextSunday.setDate(nextSunday.getDate() + 7)
  }

  const timeUntilClear = nextSunday.getTime() - now.getTime()

  setTimeout(() => {
    const forms = document.querySelectorAll('form')
    forms.forEach(form => {
      if (form.id) {
        clearAllFormData(form.id)
      }
    })

    scheduleWeeklyClear()
  }, timeUntilClear)
}

export function updateResetTimer() {
  const now = new Date()
  const nextSunday = new Date(now)

  nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7))
  nextSunday.setHours(24, 0, 0, 0)

  const timeRemaining = nextSunday - now

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60))
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

  const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const timerElement = document.getElementById('resetTimer')
  if (timerElement) {
    timerElement.textContent = `Next reset in: ${formatted}`
  }
}
