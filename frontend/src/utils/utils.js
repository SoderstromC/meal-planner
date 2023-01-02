// const BASE_URL = "https://project-auth-ww2g7bm2ra-lz.a.run.app";
const BASE_URL = "http://localhost:8090";
const RECIPE_BASE_URL = "https://tasty.p.rapidapi.com/recipes/get-more-info?";

export const API_URL = (slug) => `${BASE_URL}/${slug}`;
export const RECIPE_URL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
export const SINGLE_URL = (recipe_id) => `${RECIPE_BASE_URL}id=${recipe_id}`;