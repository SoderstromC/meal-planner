const BASE_URL = "http://localhost:8090"; //TOGGLE TO THIS WHEN WORKING LOCALLY
//const BASE_URL = "https://meal-planner-aqo5p3ykrq-lz.a.run.app";

const RECIPE_BASE_URL = "https://tasty.p.rapidapi.com/recipes/get-more-info?";

export const API_URL = (slug) => `${BASE_URL}/${slug}`;
export const RECIPE_URL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
export const SINGLE_URL = (recipeId) => `${RECIPE_BASE_URL}id=${recipeId}`;
