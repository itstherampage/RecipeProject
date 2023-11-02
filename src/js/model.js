export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    //"5ed6604591c37cdc054bc8fd"
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} \nStatus code (${res.status})`);
    }

    console.log(res, data);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.source_url,
      title: recipe.title,
    };
    console.log(state.recipe);
  } catch (error) {
    alert(error);
  }
};
