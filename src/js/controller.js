import 'core-js/stable';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

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

    // 1) Loading Recipe
    //loadRecipe is async function, returns a promise

    await model.loadRecipe(id);

    //2) Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.AddHandlerRender(controlRecipes);
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

///////////////////////////////////////
