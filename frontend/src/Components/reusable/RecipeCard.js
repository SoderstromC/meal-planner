import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";


export const RecipeCard = ({id, name, description, time, img}) => {
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);

/***SAVING A RECIPE ID TO SPECIFIC USER IN SERVER ****/

  const buttonClickSave = (id) => {
    console.log('recipeid', id);
    console.log('userid', userId)
    console.log('accessToken', accessToken)

      const options = {
      method: 'POST'
      //HEADER?
    };

// ADD RECIPIE ID TO USER ID
fetch(LIKES_URL(tweetId), options) // Catch the data and update with uniqe object (option)
.then((res) => res.json())
.then((data) => {
  fetchTweets(data)
  console.log('data2', data); // Gets/request all data again
})
.catch((error) => console.error('error2', error));    

    // Få fram id
    // post req till /saveRecipe
    // feedback till användaren (tex disabla knappen och ge info, loader)
  };

return(
  <>
  <ReceipeListCard>
    <div>
      <h3>{name}</h3>
    </div>  
    <div>
      <p>Cooking time in minutes: {time}</p>
    </div>
    <ImageWrapper>
      <img src={img} />
    </ImageWrapper>
    <div>
      <h4>Description:</h4>
      <p>{description}</p>
    </div>  
    <button type="submit" onClick={buttonClickSave}>Save to My recipes</button>
  </ReceipeListCard>
  </>
)
}

const ReceipeListCard = styled.section`
  border: 1px solid #333;
  margin: 10px;
  padding: 20px;
`
const ImageWrapper = styled.div`
width: 200px;
height: 200px;

img {
  width: 100%;
  height: 100%;
}
`