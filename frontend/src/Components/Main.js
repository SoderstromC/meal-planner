import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import user from "reducers/user";
import styled from "styled-components";

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
    useEffect(() => {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(thoughts.actions.setItems(data.response));
                    dispatch(thoughts.actions.setError(null));
                } else {
                    dispatch(thoughts.actions.setItems([]));
                    dispatch(thoughts.actions.setError(data.response));
                }
            })
    }, []);

    const logOutOnClick = () => {
        dispatch(user.actions.setAccessToken(null));
        navigate("/login");
    };

    return (
        <MainContainer>
            <Link to="/login">GO TO LOGIN</Link>
            
            <h2>This is the landing page</h2>
            <Link to="/recipes">Go to: Recipes list!</Link>
            <Link to="/saved">Go to: My saved recipes!</Link>
            <Link to="/shoppinglist">Go to: My shopping list!</Link>

            {/* {thoughtItems.map((item) => {
                return <p key={item._id}>{item.message}</p>
            })} */}
            <LogOutButton type="button" onClick={logOutOnClick}>LOG OUT</LogOutButton>
        </MainContainer>
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
const LogOutButton = styled.button`
margin-top: 40px;
`