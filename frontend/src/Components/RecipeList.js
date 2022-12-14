import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "reducers/recipes";
import { RecipeCard } from "./reusable/RecipeCard";
import Nav from "./reusable/Nav";
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';

import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

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

return(
  <OuterWrapper>
    <InnerWrapper>
      <Nav />
      <ContentWrapper>
        <h2>All recipes</h2>
        <RecipeListWrapper>
          {arrayOfRecipes.map((recipe) => {
          return ( 
            <RecipeCard
              key= {recipe.id}
              id={recipe.id}
              name={recipe.name}
              time={recipe.total_time_minutes}
              img={recipe.thumbnail_url}
            />
          )
          })}
        </RecipeListWrapper>
      </ContentWrapper>
    </InnerWrapper>
  </OuterWrapper>
)
} 

export default RecipeList;

const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
`

const RecipeListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;

  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 667px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1020px) {
    grid-template-columns: repeat(4, 1fr);
  }
`