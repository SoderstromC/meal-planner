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
                <TextWrapper>
                  <h3>Find recipes</h3>
                  <p>Get inspired by a list of delicious recipes and plan your meals accordingly</p>
                </TextWrapper>
                </MainPageNavWrapper>
              </Link>
              <Link
                to={`/saved`}>
                <MainPageNavWrapper>
                <img src={myRecipeImg} alt="MyRecipes" />
                <TextWrapper>
                  <h3>My recipes</h3>
                  <p>Save your favorite recipes for easy access and future reference</p>
                </TextWrapper>
                </MainPageNavWrapper>
              </Link>
              <Link
                to={`/shoppinglist`}>
                <MainPageNavWrapper>
                <img src={shoppingListImg} alt="ShoppingList" />
                <TextWrapper>
                  <h3>Shoppinglist</h3>
                  <p>Create your personalized shoppinglist based on selected recipes</p>
                </TextWrapper>
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
  width: 250px;
  height: 300px;
  border: 2px solid white;
  border-radius: 13px;
  position: relative;
  overflow: hidden;
  img {
    position: absolute; 
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  &:hover {
    border: 2px solid #333;
  }
`
const TextWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  left: 10px;
  p, h3 {
    color: white;
    text-shadow: 1px 1px 2px grey;
  }
`