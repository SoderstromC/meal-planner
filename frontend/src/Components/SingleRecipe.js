import React from "react";
import styled from "styled-components";

const SingleRecipe = () => {
    return (
      <SingleRecipeContainer>
        <div>
          <h1>This is our single recipe page</h1>
          <p>Core problems to solve:</p> 
              <li>User can se recipe details: ingredients, how to</li>
              <li>User can save a recipe</li>
              <li>User can generate shopping list</li>
        </div>
      </SingleRecipeContainer>

    ) 
}

export default SingleRecipe;

const SingleRecipeContainer = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`