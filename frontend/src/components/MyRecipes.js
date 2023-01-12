import React, { useState, useEffect } from 'react';
import { API_URL } from "utils/utils";
import { Header } from "./reusable/Header";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MyRecipes = () => {
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);

  const [recipeList, setRecipeList] = useState([]);
  //const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!accessToken) {
        navigate("/login");
    }
  }, []);

  const fetchMyRecipes = () => {
    
    // Don't fetch from server if userId is not defined
    if (!userId) {
      return;
    }

    const MY_RECIPES_URL = API_URL(`saveRecipe/${userId}`);

    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    //setLoading(true);
    fetch(MY_RECIPES_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data.response)
        console.log('data.response', data.response)})
      .catch((error) => console.error('error1', error));
      //.finally(() => setLoading(false))
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);


  // REMOVE RECIPE FROM SAVED RECIPES

  const buttonClickRemove = (recipeId) => {
    
    const REMOVE_RECIPE_URL = API_URL('removeRecipe');

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: recipeId, userId: userId }) 
    };

    fetch(REMOVE_RECIPE_URL, options) 
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data.response)
      })
      .catch((error) => console.error("error2", error));
  };

  return (
    <OuterWrapper>
      <InnerWrapper>
        <Header />
        <SavedRecipesContainer>
          <h3>My recipes</h3>
        <RecipeListWrapper>
        { console.log('new recipe list', recipeList) }
        {recipeList.map((recipe) => {
          return (
          <>
          <SingleRecipeWrapper>
          <LinkWrapper>
          <Link
            className="recipe-container"
            id={recipe.recipeId}
            to={`/single/${recipe.recipeId}`}
            key={recipe.recipeId}>
            <p>{recipe.recipeName}</p>
          </Link>
          </LinkWrapper>
          <ButtonWrapper>
          <RemoveButton onClick={() => buttonClickRemove(recipe.recipeId)}>
          <FontAwesomeIcon className="trash-icon" icon={faTrashCan} />
          </RemoveButton> 
          </ButtonWrapper>
          </SingleRecipeWrapper>
          </>
          )
          })}
        </RecipeListWrapper>
        </SavedRecipesContainer>
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default MyRecipes;

const SavedRecipesContainer = styled.div`
  width: 100%;
`
const RecipeListWrapper = styled.div`
  width: 100%;
  border: 1px solid #ACACAC;
  border-radius: 5px;
  padding: 30px;
  margin-top: 10px;
  background-color: #fafafa;
  a {
    text-decoration: none;
    }
    a:hover {
      font-weight: 700;
    }
`
const SingleRecipeWrapper = styled.div`
  display: flex;
`
const LinkWrapper = styled.div`
  width: 50%;
  a {
    color: black;
  }
  a:visited {
    color: black;
  }
`
const ButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`
const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  .trash-icon {
    color: red;
  }
  &:hover {
    transform: scale(1.2);
  }
`