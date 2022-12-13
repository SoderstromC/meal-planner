import { createSlice } from "@reduxjs/toolkit";

const recipes = createSlice({
    name: 'recipes',
    initialState: {
        results: {
            name: '',
            instructions: [],
            description: ''
        }
    },
    reducers: {
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
            'X-RapidAPI-Key': '8e1ee3390emsh9fe21f373fe17e2p12966ajsn53ef5852b4f4',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        },
        // body: JSON.stringify({ dish: getState().recipes.dish })
    };
    
    fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', generate)
        .then(response => response.json())
        // .then(response => console.log('response', response))
        .then((data) => { 
            dispatch(recipes.actions.setMealName(data))
            dispatch(recipes.actions.setMealInstructions(data))
            dispatch(recipes.actions.setMealDescription(data))}) 
            .then((data) => console.log('datad', data))
        .catch(err => console.error(err));
}   
}

/*
dispatch(game.actions.setLoading(true))
fetch('https://labyrinth.technigo.io/start', start)
  .then((res) => res.json())
  .then((data) => {
    dispatch(game.actions.setDescription(data))
  })
  .finally(() => dispatch(game.actions.setLoading(false)))
};
};
*/