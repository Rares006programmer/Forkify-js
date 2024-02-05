import View from "./View";
import resultsView from "./resultsView";

class SeachView extends View {
	#searchForm = document.querySelector(".search");
	#searchField = document.querySelector(".search__field");

	constructor() {
		super();
		this._parentEl = document.querySelector(".results");
		this._errorMessage = "No recipes found for your query! Please try again ;)";
		this._message = "";
	}

	get searchFieldValue() {
		return this.#searchField.value;
	}

	addHandlerSearch(handler) {
		this.#searchForm.addEventListener("submit", (event) => {
			event.preventDefault();
			handler();
			View.resetInputField(this.#searchField);
		});
	}

	_generateMarkup() {
		const recipes = this._data;
		const markup = resultsView.render(recipes, false);
		return markup;
	}
}

export default new SeachView();
