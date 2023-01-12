import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { generateSingle } from "reducers/recipes";
import styled from "styled-components";

export const Instructions = ({instructions}) => {
  // const instructions = useSelector((store) => store.recipes.instructions);
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(generateSingle(recipeId));
  // }, []);

  return (
    <>
      <RecipeTitle>Instructions</RecipeTitle>
      {instructions.map((instruction) => {
        // console.log('instructions',instructions)
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
  margin: 15px 8px 8px 0;

`;

const RecipeTitle = styled.h3`
margin: 10px 0;
`
