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
  const [recipeList, setRecipeList] = useState([]);
  const userId = useSelector((store) => store.user.userId);

  //const [loading, setLoading] = useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
        navigate("/login");
    }
  }, []);

  const fetchMyRecipes = () => {

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

  const buttonClickRemove = (id) => {
    
    const REMOVE_RECIPE_URL = API_URL('removeRecipe');

    console.log('idTEST', id)
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, userId: userId }) 
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
            id={recipe.id}
            to={`/single/${recipe.id}`}
            key={recipe.id}>
            <p>{recipe.name}</p>
          </Link>
          </LinkWrapper>
          <ButtonWrapper>
          <RemoveButton onClick={() => buttonClickRemove(recipe.id)}>
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