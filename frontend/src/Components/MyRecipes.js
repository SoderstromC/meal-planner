import React from "react";
import styled from "styled-components";

const MyRecipes = () => {
    return (
      <SavedRecipesContainer>
        <div>
          <h1>This is our saved recipes page</h1>
          <p>Core problems to solve:</p> 
              <li>User can see which recipes they have saved</li>
              <li>User can generate a shopping list</li>
        </div>
      </SavedRecipesContainer>

    ) 
}

export default MyRecipes;

const SavedRecipesContainer = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`