import { API_URL, RES_PER_PAGE, USER_RECIPE_INGR_NR } from "./config";
import { getJSON } from "./helpers";

const state = {
	recipe: {},
	search: {
		query: "",
		results: [],
		page: 1,
		resultsPerPage: RES_PER_PAGE,
	},
	bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
	userRecipes: JSON.parse(localStorage.getItem("userRecipes")) || [],
};

async function loadRecipe(recipeID) {
	if (recipeID.includes("user-recipe")) {
		state.recipe = state.userRecipes.find((userRecipe) => userRecipe.id === recipeID);
		return;
	}

	// Requesting and getting the recipe data
	const { data } = await getJSON(`${API_URL}/${recipeID}`);
	const recipe = data.recipe;

	// Adding the recipe to the state
	state.recipe = {
		id: recipe.id,
		title: recipe.title,
		publisher: recipe.publisher,
		sourceURL: recipe.source_url,
		imageURL: recipe.image_url,
		servings: recipe.servings,
		cookingTime: recipe.cooking_time,
		ingredients: recipe.ingredients,
		bookmarked: state.bookmarks.map((bookmark) => bookmark.id).includes(recipe.id),
		userGenerated: false,
	};
}

async function loadAllRecipes(foodName) {
	const data = await getJSON(`${API_URL}?search=${foodName}`);
	if (!data.results) throw new Error("No results found for your input!");
	state.search.query = foodName;
	state.search.results = [...data.data.recipes];
}

function getSearchResultsPage(page = 1) {
	state.search.page = page;
	const resultsPerPage = state.search.resultsPerPage;
	const start = page * resultsPerPage - resultsPerPage;
	const end = page * resultsPerPage;
	return state.search.results.slice(start, end);
}

function updateServings(servings) {
	if (servings < 1) return;
	const ingrQntOneServ = state.recipe.ingredients.map((ingredient) => ingredient.quantity / state.recipe.servings);
	state.recipe.servings = servings;
	state.recipe.ingredients.forEach((ingredient, index) => {
		ingredient.quantity = ingrQntOneServ[index] * state.recipe.servings;
		if (state.recipe.userGenerated) ingredient.quantity = Number(ingredient.quantity.toFixed(1)) || "";
	});
}

function addBookmark(recipe = state.recipe) {
	// Changing the bookmarked state
	recipe.bookmarked = true;

	// Adding the recipe to bookmarks
	state.bookmarks.push(recipe);
}

function deleteBookmark(recipe = state.recipe) {
	// Changing the bookmarked state
	recipe.bookmarked = false;

	// Removing the recipe from bookmarks
	state.bookmarks.splice(state.bookmarks.indexOf(state.bookmarks.find((bookmarkedRecipe) => bookmarkedRecipe.id === recipe.id)), 1);
}

function addUserRecipe(recipe) {
	state.userRecipes.push(recipe);
}

function deleteUserRecipe(recipe) {
	if (recipe.bookmarked) deleteBookmark(recipe);
	state.userRecipes.splice(state.userRecipes.indexOf(state.userRecipes.find((userRecipe) => userRecipe.id === recipe.id)), 1);
}

function uploadUserRecipe(recipeData) {
	const newRecipeData = JSON.parse(JSON.stringify(recipeData));

	const newRecipeIngredients = [];
	for (let i = 1; i <= USER_RECIPE_INGR_NR; i++) {
		const ingredientData = newRecipeData[`ingredient-${i}`].split(",");
		if (!ingredientData[0] && ingredientData.length <= 1) continue;

		const ingredient = {
			quantity: ingredientData[0] || "",
			unit: ingredientData[1],
			description: ingredientData[2],
		};
		newRecipeIngredients.push(ingredient);
	}

	const newRecipe = {
		id: `user-recipe-${String(Math.floor(Math.random() * 1000000000) + 1).padStart(10, "0")}`,
		title: newRecipeData.title,
		publisher: newRecipeData.publisher,
		sourceURL: newRecipeData.sourceUrl,
		imageURL: newRecipeData.image,
		servings: Number(newRecipeData.servings),
		cookingTime: newRecipeData.cookingTime,
		ingredients: [...newRecipeIngredients],
		bookmarked: false,
		userGenerated: true,
	};

	addUserRecipe(newRecipe);

	state.recipe = newRecipe;
}

function updateLocalStorage() {
	localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
	localStorage.setItem("userRecipes", JSON.stringify(state.userRecipes));
}

export {
	state,
	loadRecipe,
	loadAllRecipes,
	getSearchResultsPage,
	updateServings,
	addBookmark,
	deleteBookmark,
	addUserRecipe,
	deleteUserRecipe,
	uploadUserRecipe,
	updateLocalStorage,
};
