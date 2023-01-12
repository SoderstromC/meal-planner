import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "./reusable/Header";
import styled from "styled-components";
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';
import shoppingListImg from "../assets/images/shoppingListImg.jpg";
import myRecipeImg from "../assets/images/myRecipeImg.jpg";
import findRecipeImg from "../assets/images/findRecipeImg.jpg";

const StartPage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect( () => {
      if (!accessToken) {
          navigate("/login");
      }
  }, []);

    return (
      <OuterWrapper>
        <InnerWrapper>
          <Header />
            <MainContainer>
            <>
              <Link
                to={`/recipes`}>
                <MainPageNavWrapper>
                <img src={findRecipeImg} alt="FindRecipe" />
                   <h3>Find recipes</h3>
                   <p>Lorem ipsum is simply a dummy text of the printing and typesetting industry</p>
                </MainPageNavWrapper>
              </Link>
              <Link
                to={`/saved`}>
                <MainPageNavWrapper>
                <img src={myRecipeImg} alt="MyRecipes" />

                   <h3>My recipes</h3>
                   <p>Lorem ipsum is simply a dummy text of the printing and typesetting industry</p>
                </MainPageNavWrapper>
              </Link>
              <Link
                to={`/shoppinglist`}>
                <MainPageNavWrapper>
                <img src={shoppingListImg} alt="ShoppingList" />


                   <h3>Shoppinglist</h3>
                   <p>Lorem ipsum is simply a dummy text of the printing and typesetting industry</p>
                </MainPageNavWrapper>
              </Link>
            </>
           </MainContainer>
        </InnerWrapper>
      </OuterWrapper>
    )
}

export default StartPage;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  a {
    text-decoration: none;
    }
`

const MainPageNavWrapper = styled.div`
  border: 1px solid #ACACAC;
  border-radius: 13px;
  max-width: 250px;
  padding: 50px;
  background-color: #fafafa;
  p, h3 {
    color: black;
  }
  &:hover {
    background-color: #e1d1d1;
  p, h3 {
    color: white;
    }
  }
`