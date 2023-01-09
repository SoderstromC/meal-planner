import React, { useState, useEffect } from 'react';
import Nav from "./reusable/Nav";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoIngredients from "./NoIngredients";
import Item from "./Item";



const MyShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const userId = useSelector((store) => store.user.userId);

  //const [loading, setLoading] = useState(false);

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
        setShoppingList(data.response)
        console.log('shoppinglist1loading', data.response)})
      .catch((error) => console.error('error3', error));
      //.finally(() => setLoading(false))
  };

  useEffect(() => {
    fetchMyShoppingList();
  }, []);

 // REMOVE INGREDIENT FROM USERS SAVED SHOPPINGLIST
 const buttonClickRemove = (id) => {
  const REMOVE_INGREDIENT_URL = `http://localhost:8090/removeIngredient`;
  console.log('idTESTShop', id)
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, userId: userId }) 
    //we only need id and userId not name since we are removing and only need to find the id
  };
  fetch(REMOVE_INGREDIENT_URL, options)
    .then((res) => res.json())
    .then((data) => {
      setShoppingList(data.response)
      console.log('shoppinglistupdated', data.response)})
    .catch((error) => console.error("error3", error));
};

    return (
      <>
      <Nav />
      {console.log('shoppinglistbefore deciding on what to show', shoppingList)}
      <ShoppingListContainer>
      <h1>My Shopping List</h1>
      <ListWrapper>
       
          {shoppingList.map((component) => (
           <Item
          key= {component.id}
          componentData={component}
          />
          ))}
      </ListWrapper>
      </ShoppingListContainer>
      </>
    ) 
}

export default MyShoppingList;

const ShoppingListContainer = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const ListWrapper = styled.div`
text-align: left;
`
/*  
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
      /{shoppingList.lenght > 0 &&  
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