import React, { useState } from "react";
import { API_URL } from "utils/utils";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faHeart } from "@fortawesome/free-solid-svg-icons"

export const RecipeCard = ({ id, name, time, img }) => {
  const [savedRecipe, setSavedRecipe] = useState(false);
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken); //remove?

  /**** SAVING A RECIPE ID TO SPECIFIC USER IN SERVER ****/

  const buttonClickSave = () => {
    setSavedRecipe (true);
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
        console.log("savedData", data); // Gets/request all data again
      })
      .catch((error) => console.error("error2", error));

    // Få fram id
    // post req till /saveRecipe
    // feedback till användaren (tex disabla knappen och ge info, loader)
  };
  // uses dynamic values (image url)
  const RecipeListCard = styled.section`
    width: 100%;
    height: 330px;
    position: relative;
    overflow: hidden;
    color: white;
    border-radius: 13px;
    word-wrap: break-word;
    background-image: -moz-linear-gradient(top, rgba(0,0,0,0.1) 0%, rgba(0, 0, 0, 0.6) 100%), url(${img}); /* FF3.6+ */
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.1)), color-stop(100%,rgba(0,0,0,0.6))), url(${img}); /* Chrome,Safari4+ */
    background-image: -webkit-linear-gradient(top, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(${img}); /* Chrome10+,Safari5.1+ */
    background-image: -o-linear-gradient(top, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(${img}); /* Opera 11.10+ */
    background-image: -ms-linear-gradient(top, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(${img}); /* IE10+ */
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(${img}); /* W3C */
    background-size: cover;
    
    }
  `
  return (
    <RecipeCardWrapper>
     <Link
        className="recipe-container"
        id={id}
        to={`/single/${id}`}>
      <RecipeListCard>
        <TextWrapper>
          <h3>{name}</h3>
          {time? <p><FontAwesomeIcon icon={faClock} /> {time} minutes</p> :<p><FontAwesomeIcon icon={faClock} /> Unknown</p>}
        


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


