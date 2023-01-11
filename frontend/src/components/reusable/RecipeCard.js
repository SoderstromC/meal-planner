import React from "react";
import { API_URL } from "utils/utils";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faHeart } from "@fortawesome/free-solid-svg-icons"

export const RecipeCard = ({ id, name, time, img }) => {
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken); //remove?

  /**** SAVING A RECIPE ID TO SPECIFIC USER IN SERVER ****/

  const buttonClickSave = () => {

    // const SAVED_RECIPE_URL = `http://localhost:8090/saveRecipe`;
    const SAVED_RECIPE_URL = API_URL('saveRecipe');

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, userId: userId, name: name })
    };

    /**** ADD RECIPE ID TO USER ID ****/

    fetch(SAVED_RECIPE_URL, options) // Catch the data and update with uniqe object (option)./Shouldn't we add userId in URL?
      .then((res) => res.json())
      .then((data) => {
        alert("Recipe saved!")
        //functionGivingFeedbackThatWeHaveSavedTheDATA(data)
        console.log("savedData", data); // Gets/request all data again
      })
      .catch((error) => console.error("error2", error));

    // Få fram id
    // post req till /saveRecipe
    // feedback till användaren (tex disabla knappen och ge info, loader)
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
      <FontAwesomeIcon icon={faHeart} />
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
`

