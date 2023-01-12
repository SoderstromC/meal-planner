import React from "react";
import styled from "styled-components";

export const Instructions = ({instructions}) => {

  return (
    <>     
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
`