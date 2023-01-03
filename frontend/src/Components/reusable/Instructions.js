import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingle } from "reducers/recipes";
import styled from "styled-components";

export const Instructions = () => {
  const instructions = useSelector((store) => store.recipes.instructions);
  const recipeId = useSelector((store) => store.recipes.id);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateSingle()); //add recipe_id here?
  }, []);

  return (
    <>
      <h2>Instructions</h2>
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