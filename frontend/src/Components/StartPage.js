import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import thoughts from "reducers/thoughts";
// import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "./reusable/Header";
import styled from "styled-components";
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';

const StartPage = () => {
    // const thoughtItems = useSelector((store) => store.thoughts.items);
    // const dispatch = useDispatch();
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
          <Link to="/login">GO TO LOGIN</Link> 
            <MainContainer>
            <>
              <Link
                to={`/recipes`}>
                <MainPageNavWrapper>
                   <h3>Find recipes</h3>
                   <p>Lorem ipsum is simply a dummy text of the printing and typesetting industry</p>
                </MainPageNavWrapper>
              </Link>
              <Link
                to={`/saved`}>
                <MainPageNavWrapper>
                   <h3>My recipes</h3>
                   <p>Lorem ipsum is simply a dummy text of the printing and typesetting industry</p>
                </MainPageNavWrapper>
              </Link>
              <Link
                to={`/shoppinglist`}>
                <MainPageNavWrapper>
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
  border-radius: 5px;
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