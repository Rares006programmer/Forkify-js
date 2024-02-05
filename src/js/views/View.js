import { mark } from "regenerator-runtime";
import icons from "url:../../img/icons.svg";

export default class View {
	render(data, render = true) {
		this._data = data;
		const markup = this._generateMarkup();
		if (!render) return markup;
		this.#renderMarkup(markup);
	}

	renderSpinner(centered = false) {
		const spinnerMarkup = `
            <div class="spinner ${centered && "spinner--centered"}">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
		this.#renderMarkup(spinnerMarkup);
	}

	renderError(message = this._errorMessage) {
		const errorMarkup = `
			<div class="error">
            	<div>
              		<svg>
                		<use href="${icons}#icon-alert-triangle"></use>
              		</svg>
            	</div>
            	<p>${message}</p>
          	</div>
		`;
		this.#renderMarkup(errorMarkup);
	}

	renderMessage(message = this._message) {
		const messageMarkup = `
			<div class="message">
            	<div>
              		<svg>
                		<use href="${icons}#icon-smile"></use>
              		</svg>
            	</div>
            	<p>${message}</p>
          	</div>
		`;
		this.#renderMarkup(messageMarkup);
	}

	#renderMarkup(markup) {
		this.clearInnerHTML();
		this._parentEl.insertAdjacentHTML("afterbegin", markup);
	}

	clearInnerHTML() {
		this._parentEl.innerHTML = "";
	}

	static get hash() {
		return window.location.hash.slice(1);
	}

	static set hash(newHash) {
		window.location.hash = newHash;
	}

	static resetInputField(inputField) {
		inputField.value = "";
	}

	static resetForm(form) {
		form.reset();
	}

	static addHandlerExit(handler) {
		window.addEventListener("beforeunload", handler);
	}
}
