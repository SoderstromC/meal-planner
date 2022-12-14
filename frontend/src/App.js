import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'Components/Main';
import Login from 'Components/Login';
import NotFound from 'Components/NotFound';
import RecipeList from 'Components/RecipeList'
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
          <Route path='/recipe' element={<RecipeList/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<Main/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
      
  );
}