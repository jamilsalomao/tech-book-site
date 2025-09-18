import { influencers } from "./statsdata"
// Influencers section functionality
document.addEventListener("DOMContentLoaded", () => {
  const influencersGrid = document.getElementById("influencers-grid")
  const influencerTopics = document.getElementById("influencer-topics")
  const paginationControlsInfluencers = document.createElement('div'); // Novo elemento para os controles de paginação dos influenciadores
  paginationControlsInfluencers.id = 'pagination-controls-influencers';
  paginationControlsInfluencers.className = 'flex justify-center items-center mt-8 space-x-2';
  influencersGrid.parentNode.appendChild(paginationControlsInfluencers); // Adiciona os controles logo abaixo do grid de influenciadores

  let filteredInfluencers = [...influencers]
  let selectedTopic = "Todos"

  // --- Variáveis para Paginação dos Influenciadores ---
  const influencersPerPage = 6 // Define quantos influenciadores por página você quer exibir
  let currentInfluencerPage = 1 // Começa na primeira página
  // ----------------------------------------------------

  // Get unique topics
  const topics = ["Todos", ...new Set(influencers.flatMap((influencer) => influencer.topics))]

  // Render topic buttons
  topics.forEach((topic) => {
    const button = document.createElement("button")
    button.className = `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      topic === "Todos"
        ? "bg-green-600 text-white"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`
    button.textContent = topic
    button.addEventListener("click", () => filterInfluencersByTopic(topic))
    influencerTopics.appendChild(button)
  })

  // Filter influencers by topic
  function filterInfluencersByTopic(topic) {
    selectedTopic = topic
    currentInfluencerPage = 1 // Reseta para a primeira página ao mudar de tópico

    // Update button styles
    const buttons = influencerTopics.querySelectorAll("button")
    buttons.forEach((button) => {
      if (button.textContent === topic) {
        button.classList.add("bg-green-600", "text-white")
        button.classList.remove(
          "bg-gray-200",
          "dark:bg-gray-700",
          "text-gray-700",
          "dark:text-gray-200",
          "hover:bg-gray-300",
          "dark:hover:bg-gray-600",
        )
      } else {
        button.classList.remove("bg-green-600", "text-white")
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

    // --- Lógica de Paginação na renderização ---
    const startIndex = (currentInfluencerPage - 1) * influencersPerPage
    const endIndex = startIndex + influencersPerPage
    const influencersToDisplay = filteredInfluencers.slice(startIndex, endIndex)
    // -------------------------------------------

    if (influencersToDisplay.length === 0) {
      influencersGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 dark:text-gray-400">Nenhum influenciador encontrado nesta categoria.</p>`;
    }

    influencersToDisplay.forEach((influencer) => {
      const influencerCard = document.createElement("div")
      influencerCard.className =
        "bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] animate-fadeIn" // Adicionei animate-fadeIn aqui

      let platformsHTML = ""
      influencer.platforms.forEach((platform) => {
        platformsHTML += `
          <a
            href="${platform.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all duration-300"
          >
            ${platform.name}
          </a>
        `
      })

      let topicsHTML = ""
      influencer.topics.forEach((topic) => {
        topicsHTML += `
          <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            ${topic}
          </span>
        `
      })

      influencerCard.innerHTML = `
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-16 w-16">
              <img
                class="h-16 w-16 rounded-full object-cover border-2 border-green-500"
                src="${influencer.avatar || "/placeholder.svg"}"
                alt="${influencer.name}"
              />
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">${influencer.name}</h3>
              <p class="text-sm text-green-600 dark:text-green-400">${influencer.role || ""}</p>
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

    renderInfluencerPaginationControls() // Renderiza os controles de paginação após renderizar os influenciadores
  }

  // --- Funções de Paginação para Influenciadores ---
  function renderInfluencerPaginationControls() {
    paginationControlsInfluencers.innerHTML = ''; // Limpa os controles existentes

    const totalPages = Math.ceil(filteredInfluencers.length / influencersPerPage);

    if (totalPages <= 1) {
      return; // Não mostra paginação se houver apenas uma página ou menos
    }

    // Botão Anterior
    const prevButton = document.createElement('button');
    prevButton.className = `px-4 py-2 rounded-md font-medium transition-colors ${
      currentInfluencerPage === 1
        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
        : 'bg-green-600 text-white hover:bg-green-700'
    }`;
    prevButton.textContent = 'Anterior';
    prevButton.disabled = currentInfluencerPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentInfluencerPage > 1) {
        currentInfluencerPage--;
        renderInfluencers();
        window.scrollTo({ top: document.getElementById('influencers').offsetTop - 80, behavior: 'smooth' }); // Volta para o topo da seção
      }
    });
    paginationControlsInfluencers.appendChild(prevButton);

    // Números das páginas
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = `px-4 py-2 rounded-md font-medium transition-colors ${
        i === currentInfluencerPage
          ? 'bg-green-600 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`;
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        currentInfluencerPage = i;
        renderInfluencers();
        window.scrollTo({ top: document.getElementById('influencers').offsetTop - 80, behavior: 'smooth' }); // Volta para o topo da seção
      });
      paginationControlsInfluencers.appendChild(pageButton);
    }

    // Botão Próximo
    const nextButton = document.createElement('button');
    nextButton.className = `px-4 py-2 rounded-md font-medium transition-colors ${
      currentInfluencerPage === totalPages
        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
        : 'bg-green-600 text-white hover:bg-green-700'
    }`;
    nextButton.textContent = 'Próximo';
    nextButton.disabled = currentInfluencerPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentInfluencerPage < totalPages) {
        currentInfluencerPage++;
        renderInfluencers();
        window.scrollTo({ top: document.getElementById('influencers').offsetTop - 80, behavior: 'smooth' }); // Volta para o topo da seção
      }
    });
    paginationControlsInfluencers.appendChild(nextButton);
  }
  // ----------------------------------------------------

  // Initial render
  renderInfluencers()
})
