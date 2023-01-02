import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "reducers/recipes";
import { RecipeCard } from "./reusable/RecipeCard";
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const arrayOfRecipes = useSelector((store) => store.recipes.results)
  console.log('arrayOfRecipes', arrayOfRecipes)
  // const description = useSelector((store) => store.recipes.results[].description)
  // console.log('description', description)

  // const handleOnClick = (id) => {
  //   dispatch(generateSingle(id));
  // }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(generateRecipe());
  }, [])


return(
  <>
    <h1>List of recipes</h1>
    {arrayOfRecipes.map((recipe) => {
    return (
      <Link
          className="recipe-container"
          id={recipe.id}
          to={`/single/${recipe.id}`}>
      <RecipeCard
       id= {recipe.id}
       name={recipe.name}
       time={recipe.total_time_minutes}
       description={recipe.description}
       img={recipe.thumbnail_url}
       />
     </Link>
     )
    })}
  </>
)
} 

export default RecipeList;