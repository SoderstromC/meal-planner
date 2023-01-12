import React, { useState, useEffect } from "react";
import { Header } from "./reusable/Header";
import { API_URL } from "utils/utils";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InnerWrapper, OuterWrapper } from "./reusable/global/Wrappers";

import NoIngredients from "./NoIngredients";
import shopping from "reducers/shopping";

const MyShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const userId = useSelector((store) => store.user.userId);

  const dispatch = useDispatch();
  const buttonClickToggleCheck = (id) => {
    dispatch(shopping.actions.toggleItem(id));
  };

  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  let counter = 0;

  const fetchMyShoppingList = () => {
    // const MY_SHOPPINGLIST_URL = `http://localhost:8090/listItems/${userId}`;
    const MY_SHOPPINGLIST_URL = API_URL(`listItems/${userId}`);

    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    //setLoading(true);
    fetch(MY_SHOPPINGLIST_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setShoppingList(data.response);
        console.log("shoppinglist1loading", data.response);
      })
      .catch((error) => console.error("error3", error));
    //.finally(() => setLoading(false))
  };

  useEffect(() => {
    fetchMyShoppingList();
  }, []);

  /****  REMOVE INGREDIENT FROM USERS SAVED SHOPPINGLIST ****/

  const buttonClickRemove = (id) => {
    // const REMOVE_INGREDIENT_URL = `http://localhost:8090/removeIngredient`;
    const REMOVE_INGREDIENT_URL = API_URL("removeIngredient");

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, userId: userId }),
    };
    fetch(REMOVE_INGREDIENT_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setShoppingList(data.response);
        console.log("Updatedshoppinglist", data.response);
      })
      .catch((error) => console.error("error3", error));
  };
  /**** UPDATE INGREDIENT FROM USERS SAVED SHOPPINGLIST ****/

  const buttonClickExit = (id) => {
    alert("visar rad med item");
  };

  return (
    <>
      <Header />
      {console.log("shoppinglistbefore deciding on what to show", shoppingList)}
      {shoppingList.length === 0 && <NoIngredients />}
      {shoppingList.length > 0 && (
        <ShoppingListContainer>
          <h3>My Shopping List</h3>
          <ListWrapper>
            {shoppingList.map((component) => {
              return (
                <OuterWrapper>
                  <InnerWrapper>
                    <ShoppingItemContainer>
                      <ShoppingItemWrapper>
                        <CheckBox
                          type='checkbox'
                          checked={component.isCompleted}
                          onChange={() => buttonClickToggleCheck(component.id)}
                        />

                        <Item key={`${counter++}-${component.id}`}>
                          {component.raw_text}
                        </Item>
                        <div className='buttonwrapper'>
                          <RemoveItem
                            onClick={() => buttonClickRemove(component.id)}
                          >
                            delete
                          </RemoveItem>
                        </div>
                      </ShoppingItemWrapper>
                    </ShoppingItemContainer>
                  </InnerWrapper>
                </OuterWrapper>
              );
            })}
          </ListWrapper>
        </ShoppingListContainer>
      )}
    </>
  );
};

export default MyShoppingList;

const ShoppingListContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ListWrapper = styled.div`
  text-align: left;
  border: solid;
  width: 70%;
`;

const ShoppingItemContainer = styled.div`
  // border-bottom: 3px solid var(--border);
  margin: 10px 14px 10px 43px;
  display: flex;
  flex-direction: column;
`;

const ShoppingItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: solid;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px 0 15px;

  .buttonwrapper {
    margin-left: auto;
  }
`;

const Item = styled.div`
  margin: 10px 10px 10px 50px;
`;
const CheckBox = styled.input`
  cursor: pointer;
  appearance: none;
  margin: 5px;
  font: inherit;
  color: white;
  width: 2em;
  height: 2em;
  border: 0.15em solid black;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  &::before {
    content: "";
    width: 1em;
    height: 1em;
    transform: scale(0);
    border-radius: 50%;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em black;
  }
  &:checked::before {
    transform: scale(1);
  }
  @media (max-width: 668px) {
    margin-right: 10px;
    width: 1em;
    height: 1em;
  }
`;
const RemoveItem = styled.button`
  margin-left: auto;
  border: solid;
  height: 25px;
  width: 80px;
  background-color: transparent;
`;
