import { createSlice } from "@reduxjs/toolkit";
import { RECIPE_URL, SINGLE_URL } from "utils/utils";

const recipes = createSlice({
  name: "recipes",
  initialState: {
    results: [],
    error: null,
    components: [],
    instructions: [],
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
    setMealComponents: (store, action) => {
      store.components = action.payload;
    },
  },
});

export default recipes;

export const generateRecipe = () => {
  //change name to generateRecipeList when we are all together and merged
  return (dispatch) => {
    const generate = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3ecb94565cmshdcb2aa095eb280cp106d0djsn59e08e6ce037",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

    fetch(RECIPE_URL, generate)
      .then((response) => response.json())
      .then((data) => {
        console.log("dataAllreducer", data);
        dispatch(recipes.actions.setRecipe(data?.results));
      })
      .catch((err) => console.error(err));
  };
};

export const generateSingle = () => {

  return (dispatch) => {
    const details = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3ecb94565cmshdcb2aa095eb280cp106d0djsn59e08e6ce037",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

   
    //const id = id; /{$id} at the end of the url
    //fetch(SINGLE_URL, details)
    fetch(SINGLE_URL(recipe_id), details)
    // console.log("recipe_id", recipe_id)
      .then((response) => response.json())
      .then((data) => {
        dispatch(
            recipes.actions.setMealComponents(data?.sections[0].components));
        dispatch(
            recipes.actions.setMealInstructions(data?.instructions));
      })
      .catch((err) => console.error(err));
  };
};
