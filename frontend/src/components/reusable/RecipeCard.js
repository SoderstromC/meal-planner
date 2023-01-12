import React, { useState } from "react";
import { API_URL } from "utils/utils";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart } from "@fortawesome/free-solid-svg-icons";

export const RecipeCard = ({ id, name, time, img }) => {

  const [savedRecipe, setSavedRecipe] = useState(false);
  const userId = useSelector((store) => store.user.userId);


  // SAVING A RECIPE ID TO SPECIFIC USER IN SERVER 

  const buttonClickSave = () => {
    setSavedRecipe (true);
    const SAVED_RECIPE_URL = API_URL('saveRecipe');

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: id, userId: userId, recipeName: name })
    };

    fetch(SAVED_RECIPE_URL, options) 
      .then((res) => res.json())
      .then((data) => {
        alert("Recipe saved!")
        console.log("savedRecipeData", data);
      })
      .catch((error) => console.error("error2", error));
  };

  return (
    <RecipeCardWrapper>
     <Link
        className="recipe-container"
        id={id}
        to={`/single/${id}`}>
      <RecipeListCard>
        <img src={img} />
        <TextWrapper>
          <h3>{name}</h3>
          <p><FontAwesomeIcon icon={faClock} /> {time} minutes</p>
        </TextWrapper>  
      </RecipeListCard>
     </Link>
     <SaveButton type='submit' onClick={buttonClickSave}>
      { savedRecipe? <FontAwesomeIcon className="red-heart" icon={faHeart} /> : <FontAwesomeIcon className="grey-heart" icon={faHeart} />}
     </SaveButton>
    </RecipeCardWrapper>
  );
};

const RecipeCardWrapper = styled.div`
  position: relative;
`

const RecipeListCard = styled.section`
  width: 100%;
  word-wrap: break-word;
  height: 250px;
  position: relative;
  overflow: hidden;
  color: white;
  border-radius: 5px;
  img {
    position: absolute; 
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`

const TextWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  left: 10px;
  p, h3 {
    text-shadow: 1px 1px 2px #333;
  }
`

const SaveButton = styled.button`
  background-color: white;
  border: none;
  color: #333;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 10px;
  border-radius: 5px;
  .red-heart {
    color: red;
  }
  .grey-heart {
    color: grey;
  }
`