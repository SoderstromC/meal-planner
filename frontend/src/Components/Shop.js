import React, { useState, useEffect } from "react";
import Nav from "./reusable/Nav";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoIngredients from "./NoIngredients";
import Item from "./Item";

const MyShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  //const [loading, setLoading] = useState(false);
  const userId = useSelector((store) => store.user.userId);

  console.log("inputValue", inputValue);

  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  let counter = 0;

  const fetchMyShoppingList = () => {
    const MY_SHOPPINGLIST_URL = `http://localhost:8090/listItems/${userId}`;

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
    const REMOVE_INGREDIENT_URL = `http://localhost:8090/removeIngredient`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, userId: userId }),
      //we only need id and userId not name since we are removing and only need to find the id
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

  const buttonClickEditIngredient = (id) => {
    alert("visar inputfield");
  };

  const buttonClickExit = (id) => {
    alert("visar rad med item");
  };

  const buttonClickSave = (id, raw_text) => {
    const EDIT_INGREDIENT_URL = `http://localhost:8090/editIngredient`;
    console.log("Testar vad text innehåller", raw_text);

    // const test = value;

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, id: id, text: inputValue }),
      //we only need id and userId not name since we are updating value and only need to find the id
    };
    fetch(EDIT_INGREDIENT_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setShoppingList(data.response);
        console.log("shoppinglistupdated", data.response);
      })
      .catch((error) => console.error("error3", error));
  };

  return (
    <>
      <Nav />
      {console.log("shoppinglistbefore deciding on what to show", shoppingList)}
      {shoppingList.length === 0 && <NoIngredients />}
      {shoppingList.length > 0 && (
        <ShoppingListContainer>
          <h1>My Shopping List</h1>
          <ListWrapper>
            {shoppingList.map((component) => {
              return (
                <>
                  <ShoppingItemContainer>
                    <ShoppingItemWrapper>
                      <CheckBox
                        type='checkbox'
                        checked={component.isCompleted}
                        onChange={() => buttonClickToggleCheck(component.id)}
                      />

                      {/* <Item 
                      key={component.id} 
                      componentData={component} /> */}
                      <Item
                        key={`${counter++}-${component.id}`}
                        componentData={component}
                      />
                      {/* <li key={`${counter++}-${component.id}`}>{component.raw_text}</li> */}

                      <button onClick={() => buttonClickRemove(component.id)}>
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          buttonClickEditIngredient(
                            component.id
                            // component.raw_text
                            //Show input field
                          )
                        }
                      >
                        Edit
                      </button>
                    

                    </ShoppingItemWrapper>
                    <EditItemWrapper>
                      <EditTextInput
                        type='text'
                        name='edit item'
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder='edit item'
                        aria-label='Type and click save to create edit item.'
                      />
                      <button onClick={() => buttonClickSave(component.id)}>
                        Save
                      </button>
                      <button onClick={() => buttonClickExit(component.id)}>
                        Exit
                      </button>
                    </EditItemWrapper>
                  </ShoppingItemContainer>
                </>
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
`;

const ShoppingItemContainer = styled.div`
  display: flex;
`;

const ShoppingItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const EditItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CheckBox = styled.input`
  cursor: pointer;
  appearance: none;
  margin: 5px;
  margin-right: -42px;
  font: inherit;
  color: white;
  width: 2em;
  height: 2em;
  border: 0.15em solid black;
  margin-top: 15px;
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
// const RemoveItemButton = styled.button`
// margin-left: auto;
// border: none;
// background-color: transparent;
// `;

const EditTextInput = styled.input`
  // width: 70%;
  // font-size: 13px;
  border: 1px;
  align-self: center;
  padding: 3px 0 3px 10px;
  margin: 25px 0 0 0;
  height: 30px;
  font-family: "Montserrat", sans-serif;
  // outline: none;
`;

/* Carolines kod  
 <ListWrapper>
        <ul>
          {shoppingList.map((component) => {
            return (
              <><li key={`${counter++}-${component.id}`}>{component.raw_text}</li>
              <button onClick={() => buttonClickRemove(component.id)}>X</button></>
              )
          })}
        </ul>
      </ListWrapper>


{console.log('shoppingList', shoppingList)}
      {shoppingList.lenght === 0 && <NoIngredients />} 
      {shoppingList.lenght > 0 &&  
      <ShoppingListContainer> 
      <h1>My Shopping List</h1>
      <ListWrapper>
        <ul>
          {shoppingList.map((component) => {
            return (
              <><li key={`${counter++}-${component.id}`}>{component.raw_text}</li>
              <button onClick={() => buttonClickRemove(component.id)}>X</button></>
              )
          })}
        </ul>
      </ListWrapper>
      </ShoppingListContainer> } */

// // CHECK/UNCHECK INGREDIENT FROM USERS SAVED SHOPPINGLIST
// const buttonClickToggleCheck = (id) => {
//   const CHECK_INGREDIENT_URL = `http://localhost:8090/checkIngredient`;
//   console.log("checkIngredient", id);
//   const options = {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ userId: userId, id: id, check: true }), //hur togglar man i mongoDb? Kan man göra ternary?
//   };
//   fetch(CHECK_INGREDIENT_URL, options)
//     .then((res) => res.json())
//     .then((data) => {
//       setShoppingList(data.response);
//       console.log("check ingredient", data.response);
//     })
//     .catch((error) => console.error("error3", error));
// };
