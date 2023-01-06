import React, { useState, useEffect } from 'react';
import Nav from "./reusable/Nav";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Ingredients } from './reusable/Ingredients';


const MyShoppingList = () => {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const userId = useSelector((store) => store.user.userId);

  //const [loading, setLoading] = useState(false);

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
        setShoppingListItems(data.response)
        console.log('data response shoppinglist', data.response)})
      .catch((error) => console.error('error3', error));
      //.finally(() => setLoading(false))
  };

  useEffect(() => {
    fetchMyShoppingList();
  }, []);

    return (
      <>
      <Nav />
      <ShoppingListContainer>
      <h1>My Shopping List</h1>
      <ListWrapper>
      {shoppingListItems.map((item) => {
      return (
        <Ingredients
        key= {item.id}
        item={item.raw_text}
       />
      )
      })}
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
