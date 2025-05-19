// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle")
  const sunIcon = document.getElementById("sun-icon")
  const moonIcon = document.getElementById("moon-icon")
  const mobileSunIcon = document.getElementById("mobile-sun-icon")
  const mobileMoonIcon = document.getElementById("mobile-moon-icon")
  const html = document.documentElement
  const app = document.getElementById("app")

  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const isDarkMode = savedTheme === "dark" || (!savedTheme && systemPrefersDark)

  // Apply the initial theme
  if (isDarkMode) {
    html.classList.add("dark")
    app.classList.remove("bg-gray-50")
    app.classList.add("bg-gray-900")
    moonIcon.classList.add("hidden")
    sunIcon.classList.remove("hidden")
    mobileMoonIcon.classList.add("hidden")
    mobileSunIcon.classList.remove("hidden")
  } else {
    html.classList.remove("dark")
    app.classList.add("bg-gray-50")
    app.classList.remove("bg-gray-900")
    moonIcon.classList.remove("hidden")
    sunIcon.classList.add("hidden")
    mobileMoonIcon.classList.remove("hidden")
    mobileSunIcon.classList.add("hidden")
  }

  // Function to toggle theme
  const toggleTheme = () => {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark")
      app.classList.add("bg-gray-50")
      app.classList.remove("bg-gray-900")
      localStorage.setItem("theme", "light")
      moonIcon.classList.remove("hidden")
      sunIcon.classList.add("hidden")
      mobileMoonIcon.classList.remove("hidden")
      mobileSunIcon.classList.add("hidden")
    } else {
      html.classList.add("dark")
      app.classList.remove("bg-gray-50")
      app.classList.add("bg-gray-900")
      localStorage.setItem("theme", "dark")
      moonIcon.classList.add("hidden")
      sunIcon.classList.remove("hidden")
      mobileMoonIcon.classList.add("hidden")
      mobileSunIcon.classList.remove("hidden")
    }
  }

  // Add event listeners to theme toggle buttons
  themeToggle.addEventListener("click", toggleTheme)
  mobileThemeToggle.addEventListener("click", toggleTheme)
})
