import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingle } from "reducers/recipes";
import styled from "styled-components";

export const Instructions = () => {
  const instructions = useSelector((store) => store.recipes.instructions);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateSingle());
  }, []);

  return (
    <>
      <h2>Instructions here</h2>
      {instructions.map((instruction) => {
        console.log('instructions',instructions)
        return (
          <RecipeWrapper key={instruction.id}>
            <p>{instruction.display_text}</p>
          </RecipeWrapper>
        );
      })}
    </>
  );
};

const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// 1. map out API to get single ingredient
// 2. display all single ingredients in an ingredients list in the frontend
// 3. export to SingleRecipe component

/*
{components.map((component) => {
  return (
    <RecipeWrapper key={component.id}>
    <h2>{component.raw_text}</h2>
    {/* <p>{component.description}</p>
    <p>{component.instructions}</p>
    <p>{component.ingredient}</p>}
    </RecipeWrapper>
    )
    })}
  
  const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  `
*/

// const Ingredients = styled.div`
//   display: flex;
//   flex-direction: column;
// `
