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
    setRecipe: (store, action) => {
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

export const generateRecipe = () => {
  return (dispatch, getState) => {
    dispatch(recipes.actions.isLoading(true))
    const generate = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "05ce32baddmsh1dbc226d22c6d58p17606ejsn8489212bcecc",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

    fetch(RECIPE_URL, generate)
      .then((response) => response.json())
      .then((data) => {
        console.log("dataAllreducer", data);
        dispatch(recipes.actions.setRecipe(data?.results));
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
        "X-RapidAPI-Key": "05ce32baddmsh1dbc226d22c6d58p17606ejsn8489212bcecc",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

    console.log('recipeId dispatch', recipeId)
    console.log('SINGLE_URL', SINGLE_URL(recipeId))
    fetch(SINGLE_URL(recipeId), details)
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data)
        dispatch(
            recipes.actions.setSingleRecipe(data));
      })
      .catch((err) => console.error(err));
  };
};

