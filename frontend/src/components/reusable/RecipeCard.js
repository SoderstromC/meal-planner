import React, { useState } from "react";
import { API_URL } from "utils/utils";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart } from "@fortawesome/free-solid-svg-icons";

export const RecipeCard = ({ id, name, time, img }) => {

  const [savedRecipe, setSavedRecipe] = useState(false);
  const [savedHeart, setSavedHeart] = useState();
  const userId = useSelector((store) => store.user.userId);
  const recipes = useSelector((store) => store.recipes.results);

  const buttonClickSave = () => {
    
    const SAVED_RECIPE_URL = API_URL('saveRecipe');

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: id, userId: userId, recipeName: name })
    };

    fetch(SAVED_RECIPE_URL, options) 
      .then((res) => res.json())
      .then((data) => {
        console.log("savedRecipeData", data.response);
        if(data.success === true) {
          setSavedRecipe(true);
          console.log('savedRecipe', savedRecipe)
        } else {
          alert('You have already saved this recipe');
        }
      })
      //change heart colour to red when a recipe is saved
        .then((res) => res.json())
        .finally((data) => {
        const redHeart = recipes.map((recipe) => {
          if (recipe.id === data.id) {
            recipe.hearts += 1;
          }
          return recipe;
        });

        // updates recipe with heart count/saved
        setSavedHeart(redHeart);
        console.log('savedHeart', savedHeart)
      });
    }
  

  return (
    <RecipeCardWrapper>
     <Link
        className="recipe-container"
        id={id}
        to={`/single/${id}`}>
      <RecipeListCard img={img}>
        <TextWrapper>
          <h3>{name}</h3>
          {time? <p><FontAwesomeIcon icon={faClock} /> {time} minutes</p> :<p><FontAwesomeIcon icon={faClock} /> Unknown</p>}
        </TextWrapper> 
      </RecipeListCard>
     </Link>
     <>
      {recipes.map((recipe) => {
        return (
          <SaveButton type='button' className={recipe.hearts === 0 ? 'red-heart' : 'grey-heart'} onClick={() => { buttonClickSave(recipe._id) }}>
            <span> ❤️ </span>
          </SaveButton>
          )
        })}
     </> 
    </RecipeCardWrapper>
  );
};

const RecipeListCard = styled.section`
  width: 100%;
  height: 330px;
  position: relative;
  overflow: hidden;
  color: white;
  border-radius: 13px;
  word-wrap: break-word;
  background-image: -moz-linear-gradient(top, rgba(0,0,0,0.1) 0%, rgba(0, 0, 0, 0.6) 100%), url(${(props) => props.img}); /* FF3.6+ */
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.1)), color-stop(100%,rgba(0,0,0,0.6))), url(${(props) => props.img}); /* Chrome,Safari4+ */
  background-image: -webkit-linear-gradient(top, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(${(props) => props.img}); /* Chrome10+,Safari5.1+ */
  background-image: -o-linear-gradient(top, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(${(props) => props.img}); /* Opera 11.10+ */
  background-image: -ms-linear-gradient(top, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(${(props) => props.img}); /* IE10+ */
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(${(props) => props.img}); /* W3C */
  background-size: cover;
  
  `

const RecipeCardWrapper = styled.div`
  position: relative;
`

const TextWrapper = styled.div`
  position: absolute;
  bottom: 18px;
  padding-left: 18px;
  width: 100%;
  p, h3 {
    text-shadow: 1px 0px 1px #000;
  }
`
  
const SaveButton = styled.button`
  background-color: white;
  border: none;
  color: #333;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: 5px;
  .red-heart {
    color: red;
  }
  .grey-heart {
    color: grey;
  }
 `