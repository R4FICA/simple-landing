class CardPagination {
    constructor(cardsPerPage = 3) {
        this.cardsPerPage = cardsPerPage;
        this.currentPage = 1;
        this.cards = [];
        this.totalPages = 0;
    }

    async loadCards() {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            this.cards = data.cards;
            this.totalPages = Math.ceil(this.cards.length / this.cardsPerPage);
            this.displayCards();
            this.updatePaginationButtons();
        } catch (error) {
            console.error('Error loading cards:', error);
        }
    }

    displayCards() {
        const container = document.getElementById('cards-container');
        const startIndex = (this.currentPage - 1) * this.cardsPerPage;
        const endIndex = startIndex + this.cardsPerPage;
        const currentCards = this.cards.slice(startIndex, endIndex);

        container.innerHTML = '';

        currentCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                <img src="${card.image}" alt="${card.title}">
                <div class="card-content">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                </div>
            `;
            container.appendChild(cardElement);
        });
    }

    updatePaginationButtons() {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.innerText = '←';
        prevButton.className = 'pagination-btn';
        prevButton.disabled = this.currentPage === 1;
        prevButton.addEventListener('click', () => this.changePage(this.currentPage - 1));
        paginationContainer.appendChild(prevButton);

        // Page numbers
        for (let i = 1; i <= this.totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.className = `pagination-btn ${i === this.currentPage ? 'active' : ''}`;
            pageButton.addEventListener('click', () => this.changePage(i));
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.innerText = '→';
        nextButton.className = 'pagination-btn';
        nextButton.disabled = this.currentPage === this.totalPages;
        nextButton.addEventListener('click', () => this.changePage(this.currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }

    changePage(page) {
        this.currentPage = page;
        this.displayCards();
        this.updatePaginationButtons();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cardPagination = new CardPagination(6); // Mostrando 6 cards por página
    cardPagination.loadCards();
});
