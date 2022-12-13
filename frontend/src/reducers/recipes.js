import { createSlice } from "@reduxjs/toolkit";

const recipes = createSlice({
    name: 'recipe',
    initialState: {
        dish: [],
        value: ''
    },
    reducers: {
        setDish: (store, action) => {
            store.dish = action.payload;
        },
        setValue: (store, action) => {
            store.value = action.payload;
        }
    }

}); 

export default recipes;

export const generateRecipe = () => {
    return (dispatch, getState) => {
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
        .then(response => console.log('response', response))
        .then((data) => {
            dispatch(recipes.actions.setDish(data))
          })
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