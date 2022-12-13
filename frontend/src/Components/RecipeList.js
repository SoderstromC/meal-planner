import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "reducers/recipes";

const RecipeList = () => {
  const name = useSelector((store) => store.recipes.results.name)
  console.log('nameSelected', name)
  const description = useSelector((store) => store.recipes.results[].description)
  console.log('description', description)
  
  const dispatch = useDispatch()
  dispatch(generateRecipe());

return(
  <>
    <p>{name}</p>
    <p>{description}</p>
  </>
)
} 

export default RecipeList;