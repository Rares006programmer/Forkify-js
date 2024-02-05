import View from "./View";
import icons from "url:../../img/icons.svg";
import fracty from "fracty";

class RecipeView extends View {
	constructor() {
		super();
		this._parentEl = document.querySelector(".recipe");
		this._errorMessage = "We could not find that recipe. Please try another one!";
		this._message = "Start by searching for a recipe or an ingredient. Have fun!";
	}

	addHandlerRender(handler) {
		["hashchange", "load"].forEach((eventType) => window.addEventListener(eventType, handler));
	}

	addHandlerBookmark(handler) {
		this._parentEl.addEventListener("click", (event) => {
			const clickedBookmarkBtn = event.target.closest(".btn--bookmark");
			if (clickedBookmarkBtn) handler();
		});
	}

	addHandlerDelUserRecipe(handler) {
		this._parentEl.addEventListener("click", (event) => {
			const clickedDeleteBtn = event.target.closest(".btn--delete");
			if (clickedDeleteBtn) handler();
		});
	}

	addHandlerServings(handler) {
		this._parentEl.addEventListener("click", (event) => {
			const clickedServingsBtn = event.target.closest(".btn--update-servings");
			if (!clickedServingsBtn) return;
			handler(Number(clickedServingsBtn.getAttribute("data-update-to")));
		});
	}

	_generateMarkup() {
		const recipe = this._data;
		const markup = `
			<figure class="recipe__fig">
				<img src="${recipe.imageURL}" class="recipe__img" />
				<h1 class="recipe__title">
					<span>${recipe.title}</span>
				</h1>
			</figure>

			<div class="recipe__details">
				<div class="recipe__info">
					<svg class="recipe__info-icon">
						<use href="${icons}#icon-clock"></use>
					</svg>
					<span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
					<span class="recipe__info-text">minutes</span>
				</div>
				<div class="recipe__info">
					<svg class="recipe__info-icon">
						<use href="${icons}#icon-users"></use>
					</svg>
					<span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
					<span class="recipe__info-text">servings</span>

					<div class="recipe__info-buttons">
						<button class="btn--update-servings btn--tiny" data-update-to="${recipe.servings - 1}">
							<svg>
								<use href="${icons}#icon-minus-circle"></use>
							</svg>
						</button>
						<button class="btn--update-servings btn--tiny" data-update-to="${recipe.servings + 1}">
							<svg>
								<use href="${icons}#icon-plus-circle"></use>
							</svg>
						</button>
					</div>
				</div>

				<div class="recipe__user-generated ${!recipe.userGenerated ? "hidden" : ""}">
					<svg>
						<use href="${icons}#icon-user"></use>
					</svg>
				</div>
				<button class="btn--delete ${!recipe.userGenerated ? "hidden" : ""}" title="Delete Recipe">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
					</svg>
          		</button>
          		<button class="btn--bookmark btn--round">
					<svg>
						<use href="${icons}#icon-${recipe.bookmarked ? "bookmark-fill" : "bookmark"}"></use>
					</svg>
          		</button>
        	</div>

			<div class="recipe__ingredients">
				<h2 class="heading--2">Recipe ingredients</h2>
				<ul class="recipe__ingredient-list">
					${recipe.ingredients.reduce(
						(accumulator, ingredient) =>
							accumulator +
							`
							<li class="recipe__ingredient">
								<svg class="recipe__icon">
									<use href="${icons}#icon-check"></use>
								</svg>
								<div class="recipe__quantity">${ingredient.quantity ? fracty(ingredient.quantity) : ""}</div>
								<div class="recipe__description">
									<span class="recipe__unit">${ingredient.unit || ""}</span>
									${ingredient.description}
								</div>
							</li>
						`,
						""
					)}
				</ul>
			</div>

			<div class="recipe__directions">
				<h2 class="heading--2">How to cook it</h2>
				<p class="recipe__directions-text">
					This recipe was carefully designed and tested by
					<span class="recipe__publisher">${recipe.publisher}</span>. Please check out
					directions at their website.
				</p>
				<a class="btn--small recipe__btn" href="${recipe.sourceURL}" target="_blank">
					<span>Directions</span>
					<svg class="search__icon">
						<use href="${icons}#icon-arrow-right"></use>
					</svg>
				</a>
			</div>
        `;
		return markup;
	}
}

export default new RecipeView();
