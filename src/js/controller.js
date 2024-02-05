import * as Model from "./model";
import View from "./views/View";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import userRecipesView from "./views/userRecipesView";
import addRecipeView from "./views/addRecipeView";

import "core-js/stable";
import "regenerator-runtime/runtime";

///////////////////////////////////////

async function controlRecipes() {
	try {
		const recipeID = View.hash;
		if (!recipeID) return;

		recipeView.renderSpinner(bookmarksView.isVisible());

		await Model.loadRecipe(recipeID);
		const { recipe } = Model.state;

		recipeView.render(recipe);

		searchView.render(Model.getSearchResultsPage(Model.state.search.page));
		controlBookmarks();
		controlUserRecipes();
	} catch (error) {
		console.error(error);
		recipeView.renderError();
	}
}

async function controlSearchResults() {
	try {
		const searchedFood = searchView.searchFieldValue;
		if (!searchedFood) return;

		searchView.renderSpinner();

		await Model.loadAllRecipes(searchedFood);
		const pageResults = Model.getSearchResultsPage(1);

		searchView.render(pageResults);

		controlPagination();
	} catch (error) {
		paginationView.clearInnerHTML();
		console.error(error);
		searchView.renderError();
	}
}

function controlPagination() {
	paginationView.render(Model.state.search);
	paginationView.addHandlerClick(turnPage);

	function turnPage(page) {
		const pageResults = Model.getSearchResultsPage(page);
		searchView.render(pageResults);
		paginationView.render(Model.state.search);
	}
}

function controlServings(servings) {
	Model.updateServings(servings);
	recipeView.render(Model.state.recipe);
}

function controlBookmarks() {
	if (Model.state.bookmarks.length) bookmarksView.render(Model.state.bookmarks);
	else bookmarksView.renderError();
}

function controlUserRecipes() {
	if (Model.state.userRecipes.length) userRecipesView.render(Model.state.userRecipes);
	else userRecipesView.renderError();
}

function controlBookmarkRecipe() {
	// Add / Remove Bookmark
	if (!Model.state.recipe.bookmarked) Model.addBookmark();
	else Model.deleteBookmark();

	// Updating the UI (recipe & bookmarks)
	recipeView.render(Model.state.recipe);
	controlBookmarks();
}

function controlDeleteUserRecipe() {
	Model.deleteUserRecipe(Model.state.recipe);
	recipeView.renderMessage("Recipe Deleted! Add another one or search for other cool recipes! Have fun!");
	View.hash = "";

	controlBookmarks();
	controlUserRecipes();
}

function controlAddRecipe() {
	Model.uploadUserRecipe(addRecipeView.newRecipe);
	View.hash = Model.state.recipe.id;
}

function init() {
	recipeView.renderMessage();

	recipeView.addHandlerRender(controlRecipes);
	bookmarksView.addHandlerRender(controlBookmarks);
	userRecipesView.addHandlerRender(controlUserRecipes);
	searchView.addHandlerSearch(controlSearchResults);
	recipeView.addHandlerServings(controlServings);
	recipeView.addHandlerBookmark(controlBookmarkRecipe);
	recipeView.addHandlerDelUserRecipe(controlDeleteUserRecipe);
	addRecipeView.addHandlerUpload(controlAddRecipe);
	View.addHandlerExit(Model.updateLocalStorage);
}

init();
