import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'components/Main';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import RecipeList from 'components/RecipeList';
import MyRecipes from 'components/MyRecipes';
import ShoppingList from 'components/ShoppingList';
import { Ingredients } from 'components/reusable/Ingredients';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thoughts from 'reducers/thoughts';
import user from 'reducers/user';
import recipes from 'reducers/recipes';

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer,
  recipes: recipes.reducer
});

const store = configureStore({reducer});
export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/recipes' element={<RecipeList/>}></Route>
          <Route path='/saved' element={<MyRecipes/>}></Route>
          <Route path='/shoppinglist' element={<ShoppingList/>}></Route>
          <Route path='/single' element={<Ingredients/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
      
  );
}