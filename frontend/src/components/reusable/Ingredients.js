import React from "react";
import { useSelector } from "react-redux";
import { API_URL } from "utils/utils";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import uniqid from 'uniqid';

export const Ingredients = ({components}) => {
  const userId = useSelector((store) => store.user.userId);

  const buttonClickSave = () => {
    const SAVED_SHOPPINGLIST_URL = API_URL('saveListItem');

    let itemsToSave = [];

    components.map((component) => {
      itemsToSave.push({
        "raw_text": component.raw_text,
        "id": uniqid()
      });
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, itemsToSave: itemsToSave })
    };

    fetch(SAVED_SHOPPINGLIST_URL, options)
      .then((res) => res.json())
      .then((data) => {data.response})
      .catch((error) => console.error("Error saving items to shopping list:", error));
    };

  return (
    <OuterWrapper>
      <ButtonWrapper>
        <h3>Ingredients</h3>
        <AddToShopping type='button' onClick={buttonClickSave}><FontAwesomeIcon icon={faList} /> &nbsp; Add to shoppinglist</AddToShopping>
      </ButtonWrapper>
      <InnerWrapper>
        {components.map((component) => {
          return (
            <>
              <RecipeWrapper key={component.id}>
                <p>{component.raw_text}</p>
              </RecipeWrapper>
            </>
          );
        })}
      </InnerWrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;  
  h3{
    margin: 10px 0 15px 0;
`

const RecipeWrapper = styled.div`
  display: flex-end;
  flex-direction: column;
  margin-top: 5px;
  font-weight: 500;
  p {
  margin: 8px 0;
  }
`

const AddToShopping = styled.button`
  justify-content: space-between;
  width: 155px;
  height: 34px;
  background-color: white;
  border: 1px solid #ACACAC;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  margin: 5px 0;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: black;
    border: 1px solid white;
  }
  &:active {
    color: white;
    background-color: black;
    transform: scale(1.02);
  }
  @media (max-width: 800px) {
    width: 135px;
    font-size: 10px;
  }
`
