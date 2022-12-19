import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingle } from "reducers/recipes";
import styled from "styled-components";

export const Ingredients = () => {
  const components = useSelector((store) => store.recipes.components);
  console.log('singlerecipe', components)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(generateSingle());
  }, [])

return(
  <>
    <h2>Ingredients here</h2>
    {components[0].map((component) => {
        return(
            <RecipeWrapper key={component.id}>
            <p>{component.ingredient.name}</p>
            </RecipeWrapper>
        )
    }
    )
    }

</>
)

}


const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  `




// 1. map out API to get single ingredient
// 2. display all single ingredients in an ingredients list in the frontend
// 3. export to SingleRecipe component





/*
{components.map((component) => {
  return (
    <RecipeWrapper key={component.id}>
    <h2>{component.raw_text}</h2>
    {/* <p>{component.description}</p>
    <p>{component.instructions}</p>
    <p>{component.ingredient}</p>}
    </RecipeWrapper>
    )
    })}
  
  const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  `
*/

// const Ingredients = styled.div`
//   display: flex;
//   flex-direction: column;
// `