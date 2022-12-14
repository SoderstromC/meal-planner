import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "reducers/recipes";

const RecipeList = () => {
  const arrayOfRecipes = useSelector((store) => store.recipes.results)
  console.log('arrayOfRecipes', arrayOfRecipes)
  // const description = useSelector((store) => store.recipes.results[].description)
  // console.log('description', description)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(generateRecipe());
  }, [])

return(
  <>
    <h1>List of recipes</h1>
    {arrayOfRecipes.map((recipe) => {
    <p>{recipe.name}</p>
    })}
  </>
)
} 

export default RecipeList;