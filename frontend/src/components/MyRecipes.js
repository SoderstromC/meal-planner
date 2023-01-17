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
          <h3>My recipes</h3>
          {recipeList.length === 0 && (
            <>
              <p>Go to <Link to={`/recipes`}>Find recipes</Link> and add your favorite recipes....</p>
              <EmptyList />
            </>
          )}
          {recipeList.length > 0 && (
          <RecipeListWrapper>
          {console.log('new recipe list', recipeList) }
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
        )}
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
 background-color: #fafafa;
  a {
    text-decoration: none;
    }
  a:hover {
    font-weight: 700;
  }
  @media (min-width: 667px) {
    padding: 30px;
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
  }
  a:visited {
  color: black;
  }
  a:hover {
  fontwight: 200;
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