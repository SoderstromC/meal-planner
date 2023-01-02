import React from "react";
import styled from "styled-components";

export const RecipeCard = ({id, name, description, time, img}) => {

  const buttonClickSave = () => {
    console.log(id);
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