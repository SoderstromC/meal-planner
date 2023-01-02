import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingle } from "reducers/recipes";
import styled from "styled-components";

export const Ingredients = () => {
  const components = useSelector((store) => store.recipes.components);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateSingle());
  }, []);

  return (
    <>
      <h2>Ingredients</h2>
      {components.map((component) => {
        return (
          <RecipeWrapper key={component.id}>
            <p>{component.ingredient.name}</p>
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
