import View from "./View";
import resultsView from "./resultsView";

class UserRecipesView extends View {
	constructor() {
		super();
		this._parentEl = document.querySelector(".user-recipes__list");
		this._errorMessage = "No recipes added yet. Here you can create your own recipes in just 2 minutes :))";
		this._message = "";
	}

	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}

	_generateMarkup() {
		const userRecipes = this._data;
		const markup = resultsView.render(userRecipes, false);
		return markup;
	}
}

export default new UserRecipesView();
