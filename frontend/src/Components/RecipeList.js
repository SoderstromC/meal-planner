import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "reducers/recipes";
import { RecipeCard } from "./reusable/RecipeCard";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";

const RecipeList = () => {
  const arrayOfRecipes = useSelector((store) => store.recipes.results);
  console.log("arrayOfRecipes", arrayOfRecipes);
  // const description = useSelector((store) => store.recipes.results[].description)
  // console.log('description', description)

  // const handleOnClick = (id) => {
  //   dispatch(generateSingle(id));
  // }

  const dispatch = useDispatch()

  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
        navigate("/login");
    }
}, []);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": accessToken
      }
  }
    dispatch(generateRecipe(), options);
  }, [])

  const logOutOnClick = () => {
    dispatch(user.actions.setAccessToken(null));
    navigate("/login");
};

return(
  <>
    <button type="button" onClick={() => navigate(-1)}>GO BACK TO MAIN</button>
    <button type="button" onClick={logOutOnClick}>LOG OUT</button>
    <h1>List of recipes</h1>
    {arrayOfRecipes.map((recipe) => {
    return (
      //<p>{recipe.name}</p>
      <RecipeCard
       key= {recipe.id}
       id={recipe.id}
       name={recipe.name}
       time={recipe.total_time_minutes}
       description={recipe.description}
       img={recipe.thumbnail_url}
       />
     )
    })}
  </>
)
} 

export default RecipeList;
