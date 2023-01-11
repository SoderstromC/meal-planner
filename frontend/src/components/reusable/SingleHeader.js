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
                <img src={singleRecipe.thumbnail_url}/>
                  <Text>
                    <h3>{singleRecipe.name}</h3>
                    <p>{singleRecipe.total_time_minutes}</p>
                  </Text>
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
  word-wrap: break-word;
  height: 250px;
  position: relative;
  overflow: hidden;
  color: white;
  border-radius: 13px;

  img {
    position: absolute; 
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 90%;
  }
`
const Text = styled.div`
  position: absolute;
  bottom: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  h3{
    color: white;
    margin: 0 0 30px 25px;
    width: 250px;
  }
  p{
    color: white;
    margin: 30px 70px 0 0;
    font-weight: bold;
  }
`