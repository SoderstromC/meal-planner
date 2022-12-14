import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "reducers/recipes";
// import { RecipeCard } from "/components/reusable/RecipeCard";

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
    return (
      <p>{recipe.name}</p>
      // <RecipeCard
      //   key= {recipe.id}
      //   name={recipe.name}
      // />
     )
    })}
  </>
)
} 

export default RecipeList;