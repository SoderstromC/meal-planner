import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Nav = () => {

const dispatch = useDispatch();
const navigate = useNavigate();

const logOutOnClick = () => {
  dispatch(user.actions.setAccessToken(null));
  navigate("/login");
};

  return (
      <NavContainer>
      <Link to={`/`}>
          <p>Main</p>
      </Link>
      <Link to={`/recipes`}>
          <p>Find recipes</p>
      </Link>
      <Link to={`/saved`}>
          <p>My recipes</p>
      </Link>
      <Link to={`/shoppinglist`}>
          <p>Shoppinglist</p>
      </Link>
        <LogOutButton type="button" onClick={logOutOnClick}>Logout</LogOutButton>
      </NavContainer>
  );
};
export default Nav;

  const NavContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 15px;
  font-size: 14px;

  a {
    text-decoration: none;
    }

  a:visited {
    color: black;
    }
  
  a:hover {
    font-weight: 700;
  }

  button:hover {
    font-weight: 700;
  }
  `
  const LogOutButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
`

