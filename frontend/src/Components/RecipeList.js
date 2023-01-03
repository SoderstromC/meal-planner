import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "reducers/recipes";
import { RecipeCard } from "./reusable/RecipeCard";
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import styled from "styled-components";

const RecipeList = () => {
  const arrayOfRecipes = useSelector((store) => store.recipes.results);
  console.log("arrayOfRecipes", arrayOfRecipes);
  // const description = useSelector((store) => store.recipes.results[].description)
  // console.log('description', description)

  // const handleOnClick = (id) => {
  //   dispatch(generateSingle(id));
  // }

  const dispatch = useDispatch()

  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
        navigate("/login");
    }
}, []);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": accessToken
      }
  }
    dispatch(generateRecipe(), options);
  }, [])

  const logOutOnClick = () => {
    dispatch(user.actions.setAccessToken(null));
    navigate("/login");
};

return(
  <>
    <button type="button" onClick={() => navigate(-1)}>GO BACK</button>
    <button type="button" onClick={logOutOnClick}>LOG OUT</button>
    <h1>List of recipes</h1>
    <RecipeListWrapper>
    {arrayOfRecipes.map((recipe) => {
    return (
      <Link
          className="recipe-container"
          id={recipe.id}
          to={`/single/${recipe.id}`}>
      <RecipeCard
       key= {recipe.id}
       id={recipe.id}
       name={recipe.name}
       time={recipe.total_time_minutes}
       description={recipe.description}
       img={recipe.thumbnail_url}
       />
     </Link>
     )
    })}
    </RecipeListWrapper>
  </>
)
} 

export default RecipeList;

const RecipeListWrapper = styled.div`
`