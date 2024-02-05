import View from "./View";
import resultsView from "./resultsView";

class BookmarksView extends View {
	constructor() {
		super();
		this._parentEl = document.querySelector(".bookmarks__list");
		this._errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
		this._message = "";
	}

	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}

	_generateMarkup() {
		const bookmarkedRecipes = this._data;
		const markup = resultsView.render(bookmarkedRecipes, false);
		return markup;
	}

	isVisible() {
		const styleVisibility = window.getComputedStyle(this._parentEl.parentElement).visibility;
		return styleVisibility === "visible" ? true : false;
	}
}

export default new BookmarksView();
