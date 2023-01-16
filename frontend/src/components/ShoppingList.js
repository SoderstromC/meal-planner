import React, { useState, useEffect } from "react";
import { Header } from "./reusable/Header";
import { API_URL } from "utils/utils";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InnerWrapper, OuterWrapper } from "./reusable/global/Wrappers";
import NoIngredients from "./NoIngredients";
import shopping from "reducers/shopping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MyShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editItem, setEditItem] = useState(false); ///toggla?
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
          console.log('data.response', data.response)
          setShoppingList(data.response);
        })
        .catch((error) => console.error("error3", error));
    };

  useEffect(() => {
    fetchMyShoppingList();
  }, []);


  const buttonClickRemove = (id) => {
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
  
    const buttonClickEditIngredient = (id) => {
      setEditItem(true)};

  const buttonClickExit = (id) => {
    setEditItem(false)
  };

//   const changeEvent = (id) => {
//   buttonClickEditIngredient(id) 
// };
 
  
  const buttonClickSave = (id) => {
    console.log('inputValue', inputValue)
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
        console.log("shoppinglistupdated", data.response);
      })
      .catch((error) => console.error("error3", error));
};

  return (
    <OuterWrapper>
      <InnerWrapper>
        <Header />
        <ShoppingListContainer>
          <h3>My Shopping List</h3>
          {console.log("shoppinglistbefore deciding on what to show", shoppingList)}
          {shoppingList.length === 0 && <NoIngredients />}
          {shoppingList.length > 0 && (
          <ListWrapper>
            {shoppingList.map((component) => {
              return (
                <ShoppingItemContainer>
                 {editItem? <EditItemWrapper>
                      <EditTextInput
                        type='text'
                        name='edit item'
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder='edit item'
                        aria-label='Type and click save to create edit item.'
                      />
                      <div className = "buttonwrapper">
                      <SaveItem onClick={() => buttonClickSave(component.id)}>
                        Save
                      </SaveItem>
                      <Exit onClick={() => buttonClickExit(component.id)}>
                        Exit
                      </Exit>
                      </div>
                    </EditItemWrapper> :
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
                      <EditItem
                        onClick={() => buttonClickEditIngredient(component.id)}>
                        Edit
                      </EditItem>
                      <RemoveItem onClick={() => buttonClickRemove(component.id)}>
                        <FontAwesomeIcon className="trash-icon" icon={faTrashCan} />
                      </RemoveItem>
                    </div>
                  </ShoppingItemWrapper>}
                  
                </ShoppingItemContainer>   
              );
            })}
          </ListWrapper>
          )}
        </ShoppingListContainer>
      </InnerWrapper>
    </OuterWrapper>
  );
};   

export default MyShoppingList;


const ShoppingListContainer = styled.div`
  width: 100%;
`
const ListWrapper = styled.div`
  width: 100%;
  border: 1px solid #ACACAC;
  border-radius: 13px;
  padding: 30px;
  margin-top: 10px;
  background-color: #fafafa;
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
  border: solid;

  justify-content: flex-start;
  align-items: center;
  padding: 0 15px 0 15px;
  .buttonwrapper {
    margin-left: auto;
  }
`
const EditItemWrapper = styled.div`
  display: flex;
  flex-direction: row;  
  border: solid;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px 0 15px;
  
  .buttonwrapper{
    margin-left: auto;
  }
`;

const Item = styled.div`
  margin: 10px 0 10px 10px;
  @media (min-width: 667px) {
    margin: 10px 10px 10px 50px;
  }
`

const CheckBox = styled.input`
  cursor: pointer;
  appearance: none;
  margin: 5px;
  font: inherit;
  color: white;
  width: 1.5em;
  height: 1.5em;
  border: 0.12em solid black;
  border-radius: 3px;
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
`

const EditTextInput = styled.input`
    transform: scale(1.2);
   font-size: 13px;
  border: 1px;
  align-self: center;
  padding: 3px 0 3px 10px;
  margin: 10px 10px 10px 50px;
  height: 30px;
  width: 60%;
  font-family: "Montserrat", sans-serif;
  // outline: none;
`;

const EditItem = styled.button`
margin-left: auto;
border: solid;
height: 25px;
width: 80px;
background-color: transparent;
`;
const SaveItem = styled.button`
margin-left: auto;
border: solid;
height: 25px;
width: 80px;
background-color: transparent;
`;
const Exit= styled.button`
margin-left: auto;
border: solid;
height: 25px;
width: 80px;
background-color: transparent;
`;