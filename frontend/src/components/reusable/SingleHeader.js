import React from "react";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"


export const SingleHeader = ({singleRecipe}) => {

  const SingleImage = styled.div`
    position: absolute; 
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 90%;
    background-image: url(${ singleRecipe ? singleRecipe.thumbnail_url : ''});
    `
  if (!singleRecipe) {
    return (null)
  } else {
    return(
      <>
        <SingleHeaderCard>
      
                <SingleImageWrapper key={singleRecipe.id}>
                <SingleImage src={singleRecipe.thumbnail_url}/>
                  <Text>
                    <h3>{singleRecipe.name}</h3>
                    <p><FontAwesomeIcon icon={faClock} /> {singleRecipe.total_time_minutes} minutes</p>
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

`

const Text = styled.div`
  position: absolute;
  bottom: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  h3{
    color: white;
    margin: 30px 0 12px 30px;
    width: 350px;
    text-shadow: 1px 0px 1px #000;
    font-size: 30px;
  
  }
  p{
    color: white;
    align-self: flex-end;
    margin: 30px 30px 12px 0;
    font-weight: bold;
    text-shadow: 1px 1px 2px #333;
  }
`