import React from "react";
import { useSelector } from "react-redux";
import { API_URL } from "utils/utils";
import styled from "styled-components";

export const Ingredients = ({components}) => {

  const userId = useSelector((store) => store.user.userId);

  const buttonClickSave = () => {
    const SAVED_SHOPPINGLIST_URL = API_URL('saveListItem');

    let itemsToSave = [];

    components.map((component) => {
      itemsToSave.push({
        "raw_text": component.raw_text,
        "id": component.id
      });
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, itemsToSave: itemsToSave })
    };

    // ADD INGREDIENTS TO SHOPPING LIST IN SERVER
    fetch(SAVED_SHOPPINGLIST_URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("savedShoppingListData", data);
      })
      .catch((error) => console.error("error2", error));
    };

  return (
    <OuterWrapper>
      <AddToShopping type='button' onClick={buttonClickSave}>Add to shoppinglist</AddToShopping>
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
      <AddToShopping type='button' onClick={buttonClickSave}>Add to shoppinglist</AddToShopping>
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

const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddToShopping = styled.button`
  width: 200px;
  height: 34px;
  background-color: white;
  border: solid black 2px;
  border-radius: 13px;
  font-size: 13px;
  font-weight: bold;
  margin: 15px 0;
`;
