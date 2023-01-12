import React from "react";
import { useSelector } from "react-redux";
import { API_URL } from "utils/utils";
// import { generateSingle } from "reducers/recipes";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

export const Ingredients = ({components}) => {
  // const components = useSelector((store) => store.recipes.components);
  // const portions = useSelector((store) => store.recipes.sections);
  const userId = useSelector((store) => store.user.userId);

  console.log('components', components)

  const buttonClickSave = () => {
    const SAVED_SHOPPINGLIST_URL = API_URL('saveListItem');

    let itemsToSave = [];
    console.log('components2', components)
    components.map((component) => {
      itemsToSave.push({
        "raw_text": component.raw_text,
        "id": component.id
      })
    })

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, itemsToSave: itemsToSave })
    };

    // ADD INGREDIENTS TO SHOPPING LIST IN SERVER
    fetch(SAVED_SHOPPINGLIST_URL, options)
      .then((res) => res.json())
      .then((data) => {
        //something (function?) to let the user know we have saved to shopping list
        console.log("savedShoppingListData", data);
      })
      .catch((error) => console.error("error2", error));
    };

  return (
    <OuterWrapper>
      <AddToShopping type='button' onClick={buttonClickSave}><FontAwesomeIcon icon={faList} /> Add to shoppinglist</AddToShopping>
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
      <AddToShopping type='button' onClick={buttonClickSave}><FontAwesomeIcon icon={faList} /> Add to shoppinglist</AddToShopping>
      </InnerWrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;  

h3{
  margin: 10px 0 20px 0;
`;

const RecipeWrapper = styled.div`
  display: flex-end;
  flex-direction: column;
  margin-top: 15px;
  font-size: 15px;
  font-weight: 500;

  p {
  margin: 8px 0;
  }
`;
const AddToShopping = styled.button`
  justify-content: space-between;
  width: 150px;
  height: 34px;
  background-color: white;
  border: 1px solid #ACACAC;
  border-radius: 13px;
  font-size: 13px;
  font-weight: bold;
  margin: 5px 0;

  &:hover {
    color: green;
    background-color: black;
  }

  &:active {
    color: red;
    background-color: black;
  }
`;
