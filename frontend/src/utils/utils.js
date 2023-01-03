// const BASE_URL = "https://project-auth-ww2g7bm2ra-lz.a.run.app";
const BASE_URL = "http://localhost:8090";
const RECIPE_BASE_URL = "https://tasty.p.rapidapi.com/recipes/get-more-info?";

export const API_URL = (slug) => `${BASE_URL}/${slug}`;
export const RECIPE_URL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
//export const SINGLE_URL = (recipe_id) => `${RECIPE_BASE_URL}id=${recipe_id}`; //not working
export const SINGLE_URL = 'https://tasty.p.rapidapi.com/recipes/get-more-info?id=8575';


//export const MOVIEDETAILS_URL = (movie_id) => `https://api.themoviedb.org/3/movie/${movie_id}?api_key=ef036d5d52e9f5b31fbadf6ef00b48d2&language=en-US`;