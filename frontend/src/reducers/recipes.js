import { createSlice } from "@reduxjs/toolkit";
import { RECIPE_URL, SINGLE_URL } from "utils/utils";

const recipes = createSlice({
  name: "recipes",
  initialState: {
    results: [],
    error: null,
    singleRecipe: null,
    instructions: [],
    loading: false,
  },
  reducers: {
    setRecipes: (store, action) => {
      store.results = action.payload;
    },
    setMealName: (store, action) => {
      store.results.name = action.payload;
    },
    setMealInstructions: (store, action) => {
      store.instructions = action.payload;
    },
    setMealDescription: (store, action) => {
      store.results.description = action.payload;
    },
    setSingleRecipe: (store, action) => {
      store.singleRecipe = action.payload;
    },
    isLoading: (store, action) => {
      store.loading = action.payload;
    },
  },
});

export default recipes;


export const generateRecipeList = () => {
  return (dispatch) => {
    dispatch(recipes.actions.isLoading(true))
    const generate = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1c3a31e00bmshd0ef42a6ee6e451p1faf4fjsn14e8d5e10b65",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

    fetch(RECIPE_URL, generate)
      .then((response) => response.json())
      .then((data) => {
        console.log("RecipeListData", data);
        dispatch(recipes.actions.setRecipes(data?.results));
      })
      .finally(() => {
        dispatch(recipes.actions.isLoading(false))
      })
  };
};


export const generateSingleRecipe = (recipeId) => {
  return (dispatch) => {
    const details = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1c3a31e00bmshd0ef42a6ee6e451p1faf4fjsn14e8d5e10b65",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

    console.log('recipeId dispatch', recipeId)
    console.log('SINGLE_URL', SINGLE_URL(recipeId))
    fetch(SINGLE_URL(recipeId), details)
      .then((response) => response.json())
      .then((data) => {
        console.log('SingleRecipeData', data)
        dispatch(
            recipes.actions.setSingleRecipe(data));
      })
      .catch((err) => console.error(err));
  };
};