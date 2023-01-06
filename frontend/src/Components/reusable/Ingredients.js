import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingle } from "reducers/recipes";
import styled from "styled-components";

export const Ingredients = ({recipeId}) => {
  const components = useSelector((store) => store.recipes.components);
  const portions = useSelector((store) => store.recipes.sections);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateSingle(recipeId));
  }, []);

  return (
    <>
      <h2>Ingredients</h2>
      {components.map((component) => {
        return (
          <RecipeWrapper key={component.id}>
             <p>{component.raw_text}</p>
             {/* <p>{component.ingredient.name}</p>
            <p>{component.measurements[0].unit.name}</p>
            <p>{component.measurements[0].quantity}</p> */}
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

// const Ingredients = styled.div`
//   display: flex;
//   flex-direction: column;
// `
