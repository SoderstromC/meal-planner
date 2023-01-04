import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from 'components/Main';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import RecipeList from 'components/RecipeList';
import MyRecipes from 'components/MyRecipes';
import ShoppingList from 'components/ShoppingList';
import SingleRecipe from 'components/SingleRecipe';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thoughts from 'reducers/thoughts';
import user from 'reducers/user';
import recipes from 'reducers/recipes';
import shopping from 'reducers/shopping';

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer,
  recipes: recipes.reducer,
  shopping: shopping.reducer
});

const store = configureStore({reducer});

store.subscribe(() => localStorage.setItem('shopping', JSON.stringify(store.getState().shopping.items)));

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Main/>} />
          <Route path='/recipes' element={<RecipeList/>} />
          <Route path='/saved' element={<MyRecipes/>} />
          <Route path='/shoppinglist' element={<ShoppingList/>}/>
          {/* <Route path='/single/:id' element={<SingleRecipe/>} /> */}
          <Route path='/single/:recipeId' element={<SingleRecipe/>} />
          <Route path='/404' element={<NotFound/>}/>
          {/* <Route path="*" element={<Navigate to="/404" />} /> */}

        </Routes>
      </BrowserRouter>
    </Provider>
      
  );
}

