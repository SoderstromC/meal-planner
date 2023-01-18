import React from "react";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export const SingleHeader = ({singleRecipe}) => {

  const img = singleRecipe ? singleRecipe.thumbnail_url : '';

  if (!singleRecipe) {
    return (null)
  } else {
    return(
      <>
        <SingleHeaderCard>
                <SingleImageWrapper key={singleRecipe.id}>
                <SingleImage img={img} />
                  <Text>
                    <h3>{singleRecipe.name}</h3>
                    <p><FontAwesomeIcon icon={faClock} /> {singleRecipe.total_time_minutes} minutes</p>
                  </Text>
                </SingleImageWrapper>         
        </SingleHeaderCard> 
      </>
    );
  };
};

const SingleHeaderCard = styled.div`
  display: block;
`

const SingleImageWrapper = styled.div`
  width: 100%;
  word-wrap: break-word;
  height: 270px;
  position: relative;
  overflow: hidden;
  color: white;
  border-radius: 13px;
`

const SingleImage = styled.div`
    position: absolute; 
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 90%;
    background-image: -moz-linear-gradient(top, rgba(0,0,0,0.1) 0%, rgba(0, 0, 0, 0.6) 100%),  url(${(props) => props.img}); /* FF3.6+ */
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.1)), color-stop(100%,rgba(0,0,0,0.6))),  url(${(props) => props.img}); /* Chrome,Safari4+ */
    background-image: -webkit-linear-gradient(top, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%),  url(${(props) => props.img}); /* Chrome10+,Safari5.1+ */
    background-image: -o-linear-gradient(top, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%),  url(${(props) => props.img}); /* Opera 11.10+ */
    background-image: -ms-linear-gradient(top, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%),  url(${(props) => props.img}); /* IE10+ */
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%),  url(${(props) => props.img}); /* W3C */
    background-size: cover;
    background-position: center;
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
  @media (max-width: 800px) {
    h3{
      font-size: 25px;
    }
  }
`
