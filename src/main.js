// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")
  const mobileMenuOpenIcon = document.getElementById("mobile-menu-open-icon")
  const mobileMenuCloseIcon = document.getElementById("mobile-menu-close-icon")

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
    mobileMenuOpenIcon.classList.toggle("hidden")
    mobileMenuCloseIcon.classList.toggle("hidden")
  })

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll("a")
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      mobileMenuOpenIcon.classList.remove("hidden")
      mobileMenuCloseIcon.classList.add("hidden")
    })
  })

  // Navbar scroll effect
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("bg-white/90", "dark:bg-gray-900/90", "backdrop-blur-md", "shadow-md")
      navbar.classList.remove("bg-transparent")
    } else {
      navbar.classList.remove("bg-white/90", "dark:bg-gray-900/90", "backdrop-blur-md", "shadow-md")
      navbar.classList.add("bg-transparent")
    }
  })

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()
})

tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
            },
            animation: {
              'bounce-slow': 'bounce 3s infinite',
            }
          }
        }
      }
