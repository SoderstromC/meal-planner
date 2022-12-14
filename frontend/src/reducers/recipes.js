import { createSlice } from "@reduxjs/toolkit";

const recipes = createSlice({
    name: 'recipes',
    initialState: {
        results: [],
        error: null
    },
    reducers: {
        setRecipe: (store, action) => {
          store.results = action.payload;
        },
        setMealName: (store, action) => {
            store.results.name = action.payload;
        },
        setMealInstructions: (store, action) => {
            store.results.instructions = action.payload;
        },
        setMealDescription: (store, action) => {
            store.results.description = action.payload;
        }
    }

}); 

export default recipes;

export const generateRecipe = () => {
    return (dispatch) => {
    const generate = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3ecb94565cmshdcb2aa095eb280cp106d0djsn59e08e6ce037',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        },
        // body: JSON.stringify({ dish: getState().recipes.dish })
    };
    
    fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', generate)
        .then(response => response.json())
        // .then(response => console.log('response', response))
        .then((data) => {
          console.log('dataAllreducer', data)
            dispatch(recipes.actions.setRecipe(data.results))
        })
        .catch(err => console.error(err));
}
}
