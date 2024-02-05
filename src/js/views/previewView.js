import View from "./View";
import icons from "url:../../img/icons.svg";

class PreviewView extends View {
	_parentEl = "";

	_generateMarkup() {
		const recipe = this._data;
		const currentID = View.hash;
		const markup = `
            <li class="preview">
                <a class="preview__link ${recipe.id === currentID ? "preview__link--active" : ""}" href="#${recipe.id}">
                    <figure class="preview__fig"> 
                        <img src="${recipe.image_url ?? recipe.imageURL}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${recipe.title}</h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                        <div class="preview__user-generated ${!recipe.userGenerated ? "hidden" : ""}">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
        `;
		return markup;
	}
}

export default new PreviewView();
