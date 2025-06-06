import { books } from "./statsdata"
// Books section functionality
document.addEventListener("DOMContentLoaded", () => {
  const booksGrid = document.getElementById("books-grid")
  const bookCategories = document.getElementById("book-categories")
  const bookModal = document.getElementById("book-modal")
  const bookModalContent = document.getElementById("book-modal-content")
  const closeBookModal = document.getElementById("close-book-modal")
  const paginationControls = document.createElement('div'); // Novo elemento para os controles de paginação
  paginationControls.id = 'pagination-controls';
  paginationControls.className = 'flex justify-center items-center mt-8 space-x-2';
  booksGrid.parentNode.appendChild(paginationControls); // Adiciona os controles logo abaixo do grid de livros

  let filteredBooks = [...books]
  let selectedCategory = "Todos"

  // --- Variáveis para Paginação ---
  const booksPerPage = 6 // Define quantos livros por página você quer exibir
  let currentPage = 1 // Começa na primeira página
  // -------------------------------

  // Get unique categories
  const categories = ["Todos", ...new Set(books.flatMap((book) => book.category))]

  // Render category buttons
  categories.forEach((category) => {
    const button = document.createElement("button")
    button.className = `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      category === "Todos"
        ? "bg-purple-600 text-white"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`
    button.textContent = category
    button.addEventListener("click", () => filterBooksByCategory(category))
    bookCategories.appendChild(button)
  })

  // Filter books by category
  function filterBooksByCategory(category) {
    selectedCategory = category
    currentPage = 1 // Reseta para a primeira página ao mudar de categoria

    // Update button styles
    const buttons = bookCategories.querySelectorAll("button")
    buttons.forEach((button) => {
      if (button.textContent === category) {
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

    // Filter books
    if (category === "Todos") {
      filteredBooks = [...books]
    } else {
      filteredBooks = books.filter((book) => book.category.includes(category))
    }

    renderBooks()
  }

  // Render books
  function renderBooks() {
    booksGrid.innerHTML = ""

    // --- Lógica de Paginação na renderização ---
    const startIndex = (currentPage - 1) * booksPerPage
    const endIndex = startIndex + booksPerPage
    const booksToDisplay = filteredBooks.slice(startIndex, endIndex)
    // -------------------------------------------

    if (booksToDisplay.length === 0) {
      booksGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 dark:text-gray-400">Nenhum livro encontrado nesta categoria.</p>`;
    }

    booksToDisplay.forEach((book) => {
      const bookCard = document.createElement("div")
      bookCard.className =
        "group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn" // Adicionei animate-fadeIn aqui

      bookCard.innerHTML = `
        <div class="relative h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img
            src="${book.cover}"
            alt="${book.title}"
            class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div class="p-4 text-white">
              <button
                class="view-book-details px-4 py-2 bg-purple-600 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                data-book-id="${book.id}"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">${book.title}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">${book.author}</p>
          <div class="mt-2">
            ${book.category.map(category => `
              <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 mr-1">
                ${category}
              </span>
            `).join("")}
          </div>
        </div>
      `

      booksGrid.appendChild(bookCard)
    })

    // Add event listeners to view details buttons
    const viewDetailsButtons = document.querySelectorAll(".view-book-details")
    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const bookId = Number.parseInt(button.getAttribute("data-book-id"))
        showBookDetails(bookId)
      })
    })

    renderPaginationControls() // Renderiza os controles de paginação após renderizar os livros
  }

  // --- Funções de Paginação ---
  function renderPaginationControls() {
    paginationControls.innerHTML = ''; // Limpa os controles existentes

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    if (totalPages <= 1) {
      return; // Não mostra paginação se houver apenas uma página ou menos
    }

    // Botão Anterior
    const prevButton = document.createElement('button');
    prevButton.className = `px-4 py-2 rounded-md font-medium transition-colors ${
      currentPage === 1
        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
        : 'bg-purple-600 text-white hover:bg-purple-700'
    }`;
    prevButton.textContent = 'Anterior';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderBooks();
        window.scrollTo({ top: document.getElementById('books').offsetTop - 80, behavior: 'smooth' }); // Volta para o topo da seção de livros
      }
    });
    paginationControls.appendChild(prevButton);

    // Números das páginas
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = `px-4 py-2 rounded-md font-medium transition-colors ${
        i === currentPage
          ? 'bg-purple-600 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`;
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderBooks();
        window.scrollTo({ top: document.getElementById('books').offsetTop - 80, behavior: 'smooth' }); // Volta para o topo da seção de livros
      });
      paginationControls.appendChild(pageButton);
    }

    // Botão Próximo
    const nextButton = document.createElement('button');
    nextButton.className = `px-4 py-2 rounded-md font-medium transition-colors ${
      currentPage === totalPages
        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
        : 'bg-purple-600 text-white hover:bg-purple-700'
    }`;
    nextButton.textContent = 'Próximo';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderBooks();
        window.scrollTo({ top: document.getElementById('books').offsetTop - 80, behavior: 'smooth' }); // Volta para o topo da seção de livros
      }
    });
    paginationControls.appendChild(nextButton);
  }
  // -------------------------------

  // Show book details in modal
  function showBookDetails(bookId) {
    const book = books.find((b) => b.id === bookId)

    if (book) {
      bookModalContent.innerHTML = `
        <div class="md:w-1/3 p-6">
          <img
            src="${book.cover}"
            alt="${book.title}"
            class="w-full h-auto object-cover rounded-md shadow-md"
          />
        </div>
        <div class="md:w-2/3 p-6">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">${book.title}</h3>
          <p class="text-gray-600 dark:text-gray-300 mt-1">${book.author}</p>
          <div class="mt-2">
            ${book.category.map(category => `
              <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 mr-1">
                ${category}
              </span>
            `).join("")}
          </div>
          <p class="text-gray-700 dark:text-gray-300 mt-4">${book.description}</p>
          <div class="mt-6">
            <a
              href=${book.link}
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Comprar livro
            </a>
          </div>
        </div>
      `

      bookModal.classList.remove("hidden")
      bookModal.classList.add("flex")
      document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
    }
  }

  // Close book modal
  closeBookModal.addEventListener("click", () => {
    bookModal.classList.add("hidden")
    bookModal.classList.remove("flex")
    document.body.style.overflow = "" // Re-enable scrolling
  })

  // Close modal when clicking outside
  bookModal.addEventListener("click", (e) => {
    if (e.target === bookModal) {
      bookModal.classList.add("hidden")
      bookModal.classList.remove("flex")
      document.body.style.overflow = ""
    }
  })

  // Initial render
  renderBooks()
})
