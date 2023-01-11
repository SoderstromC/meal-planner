import React from "react";
import styled from "styled-components/macro";


export const SingleHeader = ({singleRecipe}) => {


  if (!singleRecipe) {
    return (null)
  } else {
    return(
      <>
        <SingleHeaderCard>
      
                <SingleImageWrapper key={singleRecipe.id}>
                  <h3>{singleRecipe.name}</h3>
                  <p>{singleRecipe.total_time_minutes}</p>
                  <img src={singleRecipe.thumbnail_url}/>
                </SingleImageWrapper>
          
        </SingleHeaderCard> 
      </>
    )
  } 
}


const SingleHeaderCard = styled.div`
  display: block;
`
const SingleImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  padding: 10px;
  background-color: whitesmoke;
  border-radius: 13px;
  margin-top: 15px;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`
