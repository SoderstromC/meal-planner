import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { Link } from 'react-router-dom';
// import { Menu, SubMenu, Item } from "burger-menu";
// import 'burger-menu/lib/index.css';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

const dispatch = useDispatch();
const navigate = useNavigate();

const logOutOnClick = () => {
  dispatch(user.actions.setAccessToken(null));
  navigate("/login");
};

  return (
      <NavContainer>
      <MenuWrapper>
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
        </MenuWrapper>
        <>
      <MobileMenuWrapper>
      <div onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon className="bar-icon" icon={faBars} /></div>
      {/* <Menu className="burger-menu" isOpen={isOpen} selectedKey={'entry'} onClose={() => setIsOpen(false)}>
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
        <Line></Line>
          <LogOutButton type="button" onClick={logOutOnClick}>Logout</LogOutButton>
      </Menu> */}
      </MobileMenuWrapper>
    </>
      </NavContainer>
  );
};
export default Nav;

  const NavContainer = styled.div`
  display: flex;
  justify-content: right;
  // gap: 15px;
  font-size: 14px;
  font-weight: 600;

  a {
    text-decoration: none;
    color: black;
    }

  a:visited {
    color: black;
    }
  
  a:hover {
    font-weight: 800;
  }

  button:hover {
    font-weight: 700;
  }
  `
  const Line = styled.div`
    height: 1px;
    background: grey;
    margin-top: 10px;
  `
  const LogOutButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: grey;
    padding: 0;
`
const MenuWrapper = styled.div`
display: flex;

  justify-content: center;
  gap: 45px;
  font-size: 14px;
@media screen and (max-width: 850px) {
  display: none !important;
}
`
const MobileMenuWrapper = styled.div`
line-height: 3;
.burger-menu {
  padding: 30px;
}

.bar-icon {
  font-size: 1.5rem;
}

@media screen and (min-width: 849px) {
  display: none !important;
}
`

