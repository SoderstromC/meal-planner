import { createSlice } from "@reduxjs/toolkit";

const recipes = createSlice({
    name: 'recipes',
    initialState: {
        results: [],
        error: null,
        sections: [],
        components:[],
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
            store.components = [...store.components, action.payload];
        }
    }

}); 

export default recipes;

export const generateRecipe = () => { //change name to generateRecipeList when we are all together and merged
    return (dispatch) => {
    const generate = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3ecb94565cmshdcb2aa095eb280cp106d0djsn59e08e6ce037',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        },
    };
    
    fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', generate)
        .then(response => response.json())
        .then((data) => {
          console.log('dataAllreducer', data)
            dispatch(recipes.actions.setRecipe(data.results))
        })
        .catch(err => console.error(err));
}
}

export const generateSingle = () => { 
    return (dispatch) => {
    const details = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3ecb94565cmshdcb2aa095eb280cp106d0djsn59e08e6ce037',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        },
    };
    //const id = id; /{$id} at the end of the url
    fetch('https://tasty.p.rapidapi.com/recipes/get-more-info/?id=8138', details)
        .then(response => response.json())
        .then((data) => {
          console.log('dataSingle', data)
            dispatch(recipes.actions.setMealComponents(data.sections[0].components[0].ingredient))
        })
        .catch(err => console.error(err));
}
}

// Old funciton generating data to single recipe. We changed it and target data in each component (ingredients and Instructions)
// export const generateSingle = () => { // change to generate Recipe when together and merged (recieve an recipe id when calling genereateSingle)
//     return (dispatch) => {
//     const details = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '3ecb94565cmshdcb2aa095eb280cp106d0djsn59e08e6ce037',
//             'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
//         },
//     };
//     //const id = id; /{$id} at the end of the url
//     fetch('https://tasty.p.rapidapi.com/recipes/get-more-info/?id=8138', details)
//         .then(response => response.json())
//         .then((data) => {
//           console.log('dataSingle', data)
//             dispatch(recipes.actions.setMealComponents(data.sections[0].components))
//         })
//         .catch(err => console.error(err));
// }
// }