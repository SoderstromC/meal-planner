import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingle } from "reducers/recipes";
import styled from "styled-components";

export const Ingredients = ({recipeId}) => {
  const components = useSelector((store) => store.recipes.components);
  const portions = useSelector((store) => store.recipes.sections);
  const userId = useSelector((store) => store.user.userId);
  const raw_text = useSelector((store) => store.recipes.components.raw_text);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateSingle(recipeId));
  }, []);

  const buttonClickSave = () => {

    const SAVED_SHOPPINGLIST_URL = `http://localhost:8090/saveListItem`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, raw_text: raw_text })
    };

    // ADD INGREDIENTS TO SHOPPING LIST IN SERVER
    fetch(SAVED_SHOPPINGLIST_URL, options)
      .then((res) => res.json())
      .then((data) => {
        //something (function?) to let the user know we have saved to shopping list
        console.log("savedShoppingListData", data);
      })
      .catch((error) => console.error("error2", error));
  };

  return (
    <>
      <h2>Ingredients</h2>
      {components.map((component) => {
        return (
          <>
            <RecipeWrapper key={component.id}>
              <p>{component.raw_text}</p>
              {/* <p>{component.ingredient.name}</p>
              <p>{component.measurements[0].unit.name}</p>
              <p>{component.measurements[0].quantity}</p> */}
            </RecipeWrapper>
            <button type='button' onClick={buttonClickSave}>
                Add to Shopping list
            </button>
          </>
        );
      })}
    </>
  );
};

const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
