import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from 'components/StartPage';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import RecipeList from 'components/RecipeList';
import MyRecipes from 'components/MyRecipes';
import ShoppingList from 'components/ShoppingList';
import SingleRecipe from 'components/SingleRecipe';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import recipes from 'reducers/recipes';
import shopping from 'reducers/shopping';

const reducer = combineReducers({
  user: user.reducer,
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
          <Route path='/' element={<StartPage/>} />
          <Route path='/recipes' element={<RecipeList/>} />
          <Route path='/saved' element={<MyRecipes/>} />
          <Route path='/shoppinglist' element={<ShoppingList/>}/>
          <Route path='/single/:recipeId' element={<SingleRecipe/>} />
          <Route path='/404' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
      
  );
};

