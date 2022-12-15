import React from "react";
import styled from "styled-components";

const ShoppingList = () => {
    return (
      <ShoppingListContainer>
        <div>
          <h1>This is our shopping list page</h1>
          <p>Core problems to solve:</p> 
              <li>User can see a list of which items to shop</li>
              <li>User can edit items according to food preference/allergies</li>
        </div>
      </ShoppingListContainer>

    ) 
}

export default ShoppingList;

const ShoppingListContainer = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`