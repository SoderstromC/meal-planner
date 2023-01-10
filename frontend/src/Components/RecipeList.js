import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "reducers/recipes";
import { RecipeCard } from "./reusable/RecipeCard";
import Loading from "./reusable/Loading";
import Nav from "./reusable/Nav";

import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";


const RecipeList = () => {
  const arrayOfRecipes = useSelector((store) => store.recipes.results);
  console.log("arrayOfRecipes", arrayOfRecipes);
  const loading = useSelector((store) => store.recipes.loading);

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

return(
  <>
  {loading && <LoaderWrapper><Loading /></LoaderWrapper>}
  {!loading && (
    <Outerwrapper>
    <>
      <Nav />
      <h1>List of recipes</h1>
      <Innerwrapper>
        <RecipeListWrapper>
          {arrayOfRecipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                time={recipe.total_time_minutes}
                description={recipe.description}
                img={recipe.thumbnail_url} />
            );
          })}
        </RecipeListWrapper>
      </Innerwrapper>
    </>
  </Outerwrapper>
  )}
</>
)
} 

export default RecipeList;

const Outerwrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Innerwrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: auto;
  box-sizing: border-box;
  width: 100%;
`
const RecipeListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: auto;
  box-sizing: border-box;
`
const LoaderWrapper = styled.div`
 width: 300px;
 height: 300px;
`