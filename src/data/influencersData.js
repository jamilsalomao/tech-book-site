import { influencers } from "./statsdata"
// Influencers section functionality
document.addEventListener("DOMContentLoaded", () => {
  const influencersGrid = document.getElementById("influencers-grid")
  const influencerTopics = document.getElementById("influencer-topics")

  let filteredInfluencers = [...influencers]
  let selectedTopic = "Todos"

  // Get unique topics
  const topics = ["Todos", ...new Set(influencers.flatMap((influencer) => influencer.topics))]

  // Render topic buttons
  topics.forEach((topic) => {
    const button = document.createElement("button")
    button.className = `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      topic === "Todos"
        ? "bg-purple-600 text-white"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`
    button.textContent = topic
    button.addEventListener("click", () => filterInfluencersByTopic(topic))
    influencerTopics.appendChild(button)
  })

  // Filter influencers by topic
  function filterInfluencersByTopic(topic) {
    selectedTopic = topic

    // Update button styles
    const buttons = influencerTopics.querySelectorAll("button")
    buttons.forEach((button) => {
      if (button.textContent === topic) {
        button.classList.add("bg-purple-600", "text-white")
        button.classList.remove(
          "bg-gray-200",
          "dark:bg-gray-700",
          "text-gray-700",
          "dark:text-gray-200",
          "hover:bg-gray-300",
          "dark:hover:bg-gray-600",
        )
      } else {
        button.classList.remove("bg-purple-600", "text-white")
        button.classList.add(
          "bg-gray-200",
          "dark:bg-gray-700",
          "text-gray-700",
          "dark:text-gray-200",
          "hover:bg-gray-300",
          "dark:hover:bg-gray-600",
        )
      }
    })

    // Filter influencers
    if (topic === "Todos") {
      filteredInfluencers = [...influencers]
    } else {
      filteredInfluencers = influencers.filter((influencer) => influencer.topics.includes(topic))
    }

    renderInfluencers()
  }

  // Render influencers
  function renderInfluencers() {
    influencersGrid.innerHTML = ""

    filteredInfluencers.forEach((influencer) => {
      const influencerCard = document.createElement("div")
      influencerCard.className =
        "bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"

      let platformsHTML = ""
      influencer.platforms.forEach((platform) => {
        platformsHTML += `
          <a
            href="${platform.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
          >
            ${platform.name}
          </a>
        `
      })

      let topicsHTML = ""
      influencer.topics.forEach((topic) => {
        topicsHTML += `
          <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
            ${topic}
          </span>
        `
      })

      influencerCard.innerHTML = `
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-16 w-16">
              <img
                class="h-16 w-16 rounded-full object-cover border-2 border-purple-500"
                src="${influencer.avatar || "/placeholder.svg"}"
                alt="${influencer.name}"
              />
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">${influencer.name}</h3>
              <p class="text-sm text-purple-600 dark:text-purple-400">${influencer.role || ""}</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-gray-600 dark:text-gray-300 text-sm">${influencer.bio}</p>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            ${topicsHTML}
          </div>
          <div class="mt-6 flex space-x-3">
            ${platformsHTML}
          </div>
        </div>
      `

      influencersGrid.appendChild(influencerCard)
    })
  }

  // Initial render
  renderInfluencers()
})
