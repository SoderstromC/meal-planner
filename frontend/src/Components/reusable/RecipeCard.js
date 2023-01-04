import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

export const RecipeCard = ({ id, name, description, time, img }) => {
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken); //remove?
  console.log("recipeid", id);
  console.log("userid", userId);
  console.log("accessToken", accessToken);

  
  /***SAVING A RECIPE ID TO SPECIFIC USER IN SERVER ****/

  const buttonClickSave = () => {

    const SAVED_RECIPE_URL = `http://localhost:8090/saveRecipe`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, userId: userId })
    };

    // ADD RECIPIE ID TO USER ID
    fetch(SAVED_RECIPE_URL, options) // Catch the data and update with uniqe object (option)./Shouldn't we add userId in URL?
      .then((res) => res.json())
      .then((data) => {
        //functionGivingFeedbackThatWeHaveSavedTheDATA(data)
        console.log("savedData", data); // Gets/request all data again
      })
      .catch((error) => console.error("error2", error));

    // Få fram id
    // post req till /saveRecipe
    // feedback till användaren (tex disabla knappen och ge info, loader)
  };

  return (
    <>
      <RecipeListCard>
          <h3>{name}</h3>
          <p>Cooking time in minutes: {time}</p>
          <img src={img} />
          <p>{description}</p>
        <button type='submit' onClick={buttonClickSave}>
          Save to My recipes
        </button>
      </RecipeListCard>
    </>
  );
};

const RecipeListCard = styled.section`
  border: 1px solid #333;
  margin: 10px;
  padding: 20px;
  width: 300px;
  word-wrap: break-word;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

