import View from "./View";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
	_parentEl = document.querySelector(".upload");
	_windowEl = document.querySelector(".add-recipe-window");
	_overlayEl = document.querySelector(".overlay");

	_addRecipeBtn = document.querySelector(".add-recipe__btn");
	_closeModalBtn = document.querySelector(".btn--close-modal");

	constructor() {
		super();
		this._addHandlerShowWindow();
		this._addHandlerHideWindow();
	}

	get newRecipe() {
		const formData = new FormData(this._parentEl);
		const newRecipeObj = Object.fromEntries(formData);
		return newRecipeObj;
	}

	toggleWindow() {
		[this._overlayEl, this._windowEl].forEach((element) => element.classList.toggle("hidden"));
		setTimeout(() => View.resetForm(this._parentEl), 250);
	}

	_addHandlerShowWindow() {
		this._addRecipeBtn.addEventListener("click", this.toggleWindow.bind(this));
	}

	_addHandlerHideWindow() {
		[this._closeModalBtn, this._overlayEl].forEach((element) => element.addEventListener("click", this.toggleWindow.bind(this)));
		window.addEventListener("keyup", (event) => {
			if (event.key === "Escape" && !this._windowEl.classList.contains("hidden")) this.toggleWindow();
		});
	}

	addHandlerUpload(handler) {
		this._parentEl.addEventListener("submit", (event) => {
			event.preventDefault();
			handler();
			this.toggleWindow();
		});
	}

	_generateMarkup() {}
}

export default new AddRecipeView();
