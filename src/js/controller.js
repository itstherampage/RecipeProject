import 'core-js/stable';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

//////////////////////////////////

const controlRecipes = async function () {
  try {
    //"5ed6604591c37cdc054bc8fd"
    const id = window.location.hash.slice(1);

    if (!id) {
      return;
    }

    recipeView.renderSpinner();
    console.log(recipeView);

    // 1) Loading Recipe
    //loadRecipe is async function, returns a promise

    await model.loadRecipe(id);

    //2) Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1 Get search query
    const query = searchView.getQuery();

    if (!query) {
      return;
    }
    resultsView.renderSpinner();

    // 2 Load search results
    await model.loadSearchResults(query);

    //3 Render search results
    resultsView.render(model.getSearchResultsPage(1));

    // 4 Render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (gotoPage) {
  //1 Render new search results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 2 Render the new pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.AddHandlerRender(controlRecipes);
  searchView.AddHandlerSearch(controlSearchResults);
  paginationView.AddHandlerClick(controlPagination);
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

///////////////////////////////////////
