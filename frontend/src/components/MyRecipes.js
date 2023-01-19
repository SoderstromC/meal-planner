import React, { useState, useEffect } from 'react';
import { API_URL } from "utils/utils";
import { Header } from "./reusable/Header";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';
import EmptyList from "./reusable/EmptyList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MyRecipes = () => {
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);

  const [recipeList, setRecipeList] = useState([]);
  console.log('recipeList', recipeList)

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

    fetch(MY_RECIPES_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data.response)
      })
      .catch((error) => console.error('error1', error));
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

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
          <h3>My Recipes</h3>
          <RecipeListWrapper>
          {recipeList.length === 0 && (
            <EmptyListContainer>
              <EmptyListWrapper>
                <EmptyList />
              </EmptyListWrapper>
                <EmptyTextWrapper>
                  <h2>You haven't added any recipes yet</h2>
                  <p>Go to <Link to={`/recipes`}>Find recipes</Link> to add your favorite recipes.</p>
                </EmptyTextWrapper>
              </EmptyListContainer>
          )}
          {recipeList.length > 0 && (
          <>
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
          })}</>
        
        )}</RecipeListWrapper>
        </SavedRecipesContainer>
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default MyRecipes;


const SavedRecipesContainer = styled.div`
  width: 100%;
  h3{
    margin-bottom: 10px;
  }
  a {
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
  }
  a:visited {
    color: black;
    }
  a:hover {
    color: red;
  }
`

const RecipeListWrapper = styled.div`
  width: 100%;
  border: 1px solid #ACACAC;
  border-radius: 13px;
  margin-top: 10px;
  padding: 24px 0 40px 0;
  background-color: #fafafa;
    a {
      text-decoration: none;
      }
    a:hover {
      font-weight: 700;
    }
  @media (min-width: 667px) {
  padding: 30px 0 70px 0;
  }
`

const SingleRecipeWrapper = styled.div`
  display: flex;
  padding: 10px;
  @media (min-width: 400px) {
    padding: 10px 40px;
  }
  @media (min-width: 667px) {
    padding: 20px 70px;
  }
`

const LinkWrapper = styled.div`
  width: 90%; 
  a {
  color: black;
  font-weight: 400;
  }
  a:visited {
  color: black;
  }
  a:hover {
  color: black;
  }
`

const ButtonWrapper = styled.div`
  width: 10%;
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

const EmptyListContainer = styled.div`
  margin: 0 auto; 
  width: 300px;
  padding: 0 0 30px 0;
  font-size:  0.6em;
  @media (min-width: 400px) {
    width: 380px;
    font-size: 0.6em;
  }
  @media (min-width: 667px) {
    width: 460px;
    font-size: 1em;
  }
`


const EmptyListWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  height: 240px;
  @media (min-width: 667px) {
    width: 450px;
    height: 380px;
  }
`


const EmptyTextWrapper = styled.div`
  margin: 0 auto;
  width: 500px;
  text-align: center;
  z-index: 100;
  position: relative;
    @media (max-width: 800px) {
      width: 300px;
    }
      h2, p, a{
      color: #A7A7A7;
      a:visited {
      color: #A7A7A7;
      }
      a:hover {
      color: red;
      }
`