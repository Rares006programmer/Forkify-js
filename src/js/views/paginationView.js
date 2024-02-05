import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
	constructor() {
		super();
		this._parentEl = document.querySelector(".pagination");
	}

	addHandlerClick(handler) {
		this._parentEl.addEventListener("click", (event) => {
			const paginationBtn = event.target.closest(".btn--inline");
			if (!paginationBtn) return;
			handler(Number(paginationBtn.dataset.goto));
		});
	}

	_generateMarkup() {
		const currentPage = this._data.page;
		const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

		// Only one page
		if (numPages === 1) return "";

		// First page
		if (currentPage === 1 && numPages > 1)
			return `
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;

		// Last page
		if (currentPage === numPages && numPages > 1)
			return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <span>Page ${currentPage - 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
            </button>
        `;

		// Any other page from the middle
		return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <span>Page ${currentPage - 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
            </button>
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
	}
}

export default new PaginationView();
