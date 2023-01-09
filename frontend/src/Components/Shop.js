import React, { useState, useEffect } from 'react';
import Nav from "./reusable/Nav";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


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
        <ul>
          {shoppingList.map((component) => {
            return (
              <li key={`${counter++}-${component.id}`}>{component.raw_text}</li>
            )
          })}
        </ul>
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
