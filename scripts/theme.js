export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)

  const toggleButton = document.getElementById('themeToggle')
  if (toggleButton) {
    toggleButton.textContent = theme === 'dark' ? '☀️' : '🌙'
  }
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  setTheme(currentTheme === 'dark' ? 'light' : 'dark')
}
