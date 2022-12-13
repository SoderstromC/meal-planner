import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "reducers/recipes";

const RecipeList = () => {
  const dish = useSelector((store) => store.recipes.dish)
  const dispatch = useDispatch()
  console.log('dish1', dish)
  dispatch(generateRecipe());


return(
    <p>${dish}</p>
)
} 

export default RecipeList;