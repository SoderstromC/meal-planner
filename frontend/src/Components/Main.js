import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "./reusable/Header";
import styled from "styled-components";
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
    const dispatch = useDispatch();
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
              <Link to="/login">GO TO LOGIN</Link>   
              <h2>This is the landing page</h2>
              <Link to="/recipes">Go to: Recipes list!</Link>
              <Link to="/saved">Go to: My saved recipes!</Link>
              <Link to="/shoppinglist">Go to: My shopping list!</Link>
            {/* {thoughtItems.map((item) => {
                return <p key={item._id}>{item.message}</p>
            })} */}
           </MainContainer>
        </InnerWrapper>
      </OuterWrapper>
    )
}

export default Main;

const MainContainer = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`