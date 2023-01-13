import React from "react";
import styled from "styled-components";

export const Instructions = ({instructions}) => {

  return (
    <>
      <RecipeTitle>Instructions</RecipeTitle>
      {instructions.map((instruction) => {
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
`

const RecipeTitle = styled.h3`
margin: 10px 0;
`