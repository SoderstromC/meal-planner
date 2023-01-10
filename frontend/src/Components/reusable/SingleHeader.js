import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingleHeader } from "reducers/recipes";
import styled from "styled-components/macro";


export const SingleHeader = ({recipeId}) => {
  const recipeHeader = useSelector((store) => store.recipes.results);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateSingleHeader(recipeId));
  }, []);


return(
  <>
    <SingleHeaderCard>
      {recipeHeader.map((recipe) => {
        return (
            <SingleImageWrapper key={recipe.id}>
              <h3>{recipe.name}</h3>
              <p>{recipe.total_time_minutes}</p>
              <img src={recipe.thumbnail_url}/>
            </SingleImageWrapper>
        )
      })}
    </SingleHeaderCard> 
  </>
)
} 


const SingleHeaderCard = styled.div`
  display: block;
`
const SingleImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  padding: 10px;
  background-color: whitesmoke;
  border-radius: 13px;
  margin-top: 15px;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`
