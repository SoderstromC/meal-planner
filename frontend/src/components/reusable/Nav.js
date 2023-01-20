import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { Link } from 'react-router-dom';
import { Menu, SubMenu, Item } from "burger-menu";
import 'burger-menu/lib/index.css';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
        <Menu className="burger-menu" isOpen={isOpen} selectedKey={'entry'} onClose={() => setIsOpen(false)}>
          <Link to={`/`}>
            <Item itemKey={'main'} text={'Main'} />
          </Link>
          <Link to={`/recipes`}>
            <Item itemKey={'recipes'} text={'Find recipes'} />
          </Link>
          <Link to={`/saved`}>
            <Item itemKey={'saved'} text={'My recipes'} />
          </Link>
          <Link to={`/shoppinglist`}>
            <Item itemKey={'shoppinglist'} text={'Shoppinglist'} />
          </Link>
          <Line></Line>
          <div>
            <LogOutButton type="button" onClick={logOutOnClick}>
              <Item itemKey={'logout'} text={'Logout'} />
            </LogOutButton>
          </div>    
        </Menu>  
      </MobileMenuWrapper>
      </>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.div`
  display: flex;
  justify-content: right;
  font-size: 14px;
  font-weight: 600;
  a {
    text-decoration: none;
  }
  a:visited {
    color: black;
  }
  a:hover {
    color: red;
  }
  button:hover {
    color: red;
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
  color: #5A5959;
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
  .burger-menu {
    padding: 10px;
  }
  .bar-icon {
    font-size: 1.3rem;
  }
  @media screen and (min-width: 849px) {
    display: none !important;
  } 
`