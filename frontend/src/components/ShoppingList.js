import React, { useState, useEffect } from "react";
import { Header } from "./reusable/Header";
import EmptyShoppingListAnimation from "./reusable/EmptyShoppingListAnimation";
import { API_URL } from "utils/utils";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { InnerWrapper, OuterWrapper } from "./reusable/global/Wrappers";
import shopping from "reducers/shopping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MyShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editItem, setEditItem] = useState(null);
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
    //const MY_SHOPPINGLIST_URL = `http://localhost:8090/listItems/${userId}`;
    const MY_SHOPPINGLIST_URL = API_URL(`listItems/${userId}`);

    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(MY_SHOPPINGLIST_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setShoppingList(data.response);
      })
      .catch((error) => console.error("Error fetching shopping list:", error));
  };

  useEffect(() => {
    fetchMyShoppingList();
  }, []);

  const buttonClickRemoveItem = (id) => {
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
      .catch((error) => console.error("Error removing ingredient:", error));
  };

  /**** UPDATE INGREDIENT FROM USERS SAVED SHOPPINGLIST ****/

  const buttonClickEditIngredient = (id) => {
    setEditItem(id);
  };

  const buttonClickCancel = (id) => {
    setEditItem(null);
  };

  const buttonClickSave = (id) => {
    const EDIT_INGREDIENT_URL = `http://localhost:8090/editIngredient`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, id: id, text: inputValue }),
    };
    fetch(EDIT_INGREDIENT_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setShoppingList(data.response);
        setEditItem(false);
      })
      .catch((error) => console.error("Error saving ingredient:", error));
  };
  
  const buttonClickRemoveAll = () => {
    const EDIT_INGREDIENT_URL = `http://localhost:8090/removeallitems`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    };
    fetch(EDIT_INGREDIENT_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setShoppingList(data.response);
        console.log("shoppinglistremoved", data.response);
        console.log("shoppingList.length", shoppingList.length);
      })
      .catch((error) => console.error("Error removing all items:", error));
  };
  
  return (
    <OuterWrapper>
      <InnerWrapper>
        <Header />
        <ShoppingListContainer>
          <h3>My Shopping List</h3>
          <ShoppingListWrapper>
          {shoppingList.length === 0 && (
            <EmptyListContainer>
              <EmptyShoppingListWrapper>
                <EmptyShoppingListAnimation />
              </EmptyShoppingListWrapper>
              <EmptyTextWrapper>
                <h2>You haven't added any ingredients yet</h2>
                <p>Go to <Link to={`/saved`}>My recipes</Link> to add ingredients to your shoppinglist.</p>
              </EmptyTextWrapper>
            </EmptyListContainer>
          )}
          {shoppingList.length > 0 && (
            <>
              <RemoveAllWrapper>
              <RemoveAllButton onClick={() => buttonClickRemoveAll(userId)}>
            Remove all
              </RemoveAllButton>
              </RemoveAllWrapper>
                {shoppingList.map((component) => {
                  return (
                    <ShoppingItemContainer>
                      {editItem === component.id ? (
                        <EditItemWrapper>
                          <EditTextInput
                            type='text'
                            key={component.id}
                            name='edit item'
                            value={inputValue}
                            onChange={(event) =>
                              setInputValue(event.target.value)
                            }
                            placeholder='Edit item' 
                            aria-label='Type and click save to create edit item.'
                          />
                          <div className='buttonwrapper'>
                            <SaveItem
                              onClick={() => buttonClickSave(component.id)}>
                              Save
                            </SaveItem>
                            <CancelItem onClick={() => buttonClickCancel(component.id)}>
                              Cancel
                            </CancelItem>
                          </div>
                        </EditItemWrapper>
                      ) : (
                        <ShoppingItemWrapper>
                          <CheckBox
                            type='checkbox'
                            checked={component.isCompleted}
                            onChange={() =>
                              buttonClickToggleCheck(component.id)
                            }
                          />
                          <Item key={`${counter++}-${component.id}`}>
                            {component.raw_text}
                          </Item>
                          <div className='buttonwrapper'>
                            <EditItem
                              onClick={() =>
                                buttonClickEditIngredient(component.id)
                              }
                            >
                              Edit
                            </EditItem>
                            <RemoveItem
                              onClick={() =>
                                buttonClickRemoveItem(component.id)
                              }
                            >
                              <FontAwesomeIcon
                                className='trash-icon'
                                icon={faTrashCan}
                              />
                            </RemoveItem>
                          </div>
                        </ShoppingItemWrapper>
                      )}
                    </ShoppingItemContainer>
                  )
                })}</>
          )}</ShoppingListWrapper>
        </ShoppingListContainer>
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default MyShoppingList;

const ShoppingListContainer = styled.div`
  width: 100%;
  h3{
    margin-bottom: 10px;
  }
  a {
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
  }
  a:visited {
    color: black;
    }
  a:hover {
    color: red;
  }
  @media (max-width: 800px) {
    h3{
      padding-left: 10px;
    }
  `


const ShoppingListWrapper = styled.div`
  width: 100%;
  border: 1px solid #acacac;
  border-radius: 13px;
  padding: 0;
  margin-top: 10px;
  background-color: #fafafa;
  @media (min-width: 667px) {
    padding: 30px;
  }
`

const ShoppingItemContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  @media (min-width: 667px) {
    margin: 10px 14px 10px 43px;
  }
`


const ShoppingItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  @media (max-width: 800px) {
  padding: 0 5px;
  }
  .buttonwrapper {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`


const EditItemWrapper = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: flex-start;
  align-items: center;
  padding: 0 15px 0 15px;

  .buttonwrapper {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  @media (max-width: 800px) {
    padding: 0 5px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .buttonwrapper {
      margin: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`


const Item = styled.div`
  max-width: 465px;
  font-size: 12px;
  @media (min-width: 667px) {
    margin: 10px 10px 10px 15px;
    font-size: 16px;
  }
`


const CheckBox = styled.input`
  cursor: pointer;
  appearance: none;
  margin: 5px;
  font: inherit;
  color: white;
  width: 1.3em;
  height: 1.3em;
  border: 0.12em solid black;
  border-radius: 3px;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  &::before {
    content: "";
    width: 0.70em;
    height: 0.70em;
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
`


const RemoveItem = styled.button`
  margin-left: auto;
  border: none;
  height: 25px;
  width: 80px;
  background-color: transparent;
  color: red;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 800px) {
    height: 25px;
    width: 20px;
    padding: 0;
  }
`


const EditTextInput = styled.input`
  transform: scale(1.2);
  font-size: 13px;
  border: 1px;
  align-self: center;
  padding: 3px 0 3px 10px;
  margin: 10px 10px 10px 60px;
  height: 30px;
  width: 60%;
  font-family: "Montserrat", sans-serif;
  outline: none;
  @media (max-width: 800px) {
    margin: 10px;
    font-size: 10px;
    width: 70%;
    margin: 6px 6px 6px 20px;

  }
`


const EditItem = styled.button`
justify-content: space-between;
width: 60px;
height: 34px;
background-color: white;
border: 1px solid #ACACAC;
border-radius: 8px;
font-size: 12px;
font-weight: bold;
margin: 5px 0;
padding: 0;
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
    width: 30px;
    height: 25px;
    font-size: 10px;
    margin: 0 7px;
    border-radius: 5px;
  }
}
`

const SaveItem = styled.button`
justify-content: space-between;
width: 60px;
height: 34px;
background-color: white;
border: 1px solid #ACACAC;
border-radius: 8px;
font-size: 12px;
font-weight: bold;
margin: 5px;
padding: 0;
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
    width: 45px;
    height: 25px;
    font-size: 10px;
    margin: 4px;
    border-radius: 5px;
  }
`


const CancelItem = styled.button`
justify-content: space-between;
width: 60px;
height: 34px;
background-color: white;
border: 1px solid #ACACAC;
border-radius: 8px;
font-size: 12px;
font-weight: bold;
margin: 5px 0;
padding: 0;
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
    width: 45px;
    height: 25px;
    font-size: 10px;
    margin: 0 7px;
    border-radius: 5px;
  }
`

const RemoveAllButton = styled.button`
  justify-content: space-between;
  width: 100px;
  height: 34px;
  background-color: white;
  border: 1px solid #ACACAC;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  margin: 0 53px 35px 0;
  cursor: pointer;
  &:hover {
    color: red;
    background-color: black;
    border: 1px solid red;
  }
  &:active {
    color: white;
    background-color: black;
    transform: scale(1.02);
  }
  @media (max-width: 800px) {
    font-size: 10px;
    margin: 10px 10px 25px 0;
    width: 80px;
    height: 34px;
  }
`


const RemoveAllWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const EmptyListContainer = styled.div`
  padding: 0 0 30px 0;
  font-size:  0.6em;
  @media (min-width: 667px) {
    font-size: 1em;
  }
`
const EmptyShoppingListWrapper = styled.div`
width: 300px;
margin: 0 auto;
height: 240px;
@media (min-width: 667px) {
  width: 500px;
  height: 380px;
}
`

const EmptyTextWrapper = styled.div`
margin: 0 auto;
width: 500px;
text-align: center;
z-index: 100;
position: relative;
  @media (max-width: 800px) {
    width: 300px;
  }
  h2, p, a{
    color: #A7A7A7;
    a:visited {
    color: #A7A7A7;
    }
    a:hover {
    color: red;
    }
`