import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import styled from "styled-components";
import { InnerWrapper, OuterWrapper } from "./reusable/global/Wrappers";
import Logo from "../assets/icons/logofoodify.svg";
import introImg from "../assets/images/introImg.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    };

    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          alert("wrong credentials");
          batch(() => {
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <OuterWrapper>
      <InnerWrapper>
        <LoginHeader>
          <img src={Logo} alt="Logo" />
        </LoginHeader>
        {!showForm &&
        <>
        <ButtonWrapper>
          <ShowFormButton onClick={() => setShowForm(!showForm)}><span className="login">Login</span> | <span className="signup" onClick={() => setMode("register")}>Signup</span></ShowFormButton>
        </ButtonWrapper>
        <WebImage className="mobile-show">
          <img src={introImg} />
          <div className= "web-img-text">
            <p>This meal planner tool helps you find inspiration, plan your meals and manage your shopping list</p>
          </div>
        </WebImage>
        <WelcomeTextWrapper>
            <p>This meal planner tool helps you find inspiration, plan your meals and manage your shopping list</p>
        </WelcomeTextWrapper>
        </> 
        }
        {showForm &&
        <FormWrapper>
          <form onSubmit={onFormSubmit}>
          <h1> { mode === "register" && "Register" || "Log in" } </h1>
          <Radiobuttons>
            <label htmlFor='register'>{mode === "register" ? "" : "Not having an account yet? Sign up" }
            <RadioInput
            type='radio'
            id='register'
            checked={mode === "register"}
            onChange={() => setMode("register")}
            />
            </label>
            <label htmlFor='login'>{mode === "login" ? "" : "Already got an account? Log in" }
            <RadioInput
              type='radio'
              id='login'
              checked={mode === "login"}
              onChange={() => setMode("login")}
              />
            </label>
          </Radiobuttons>
          <InputWrapper>
            <InputLabelWrapper>
            <label htmlFor='username'>Username</label>
            <Input
              type='text'
              id='username'
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            </InputLabelWrapper>
            <InputLabelWrapper>
            <label htmlFor='password'>Password</label>
            <Input
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              /> 
            </InputLabelWrapper>
            <UserInputText>
            {password && password.length < 8
              ? 'Password must be over 8 characters'
              : ''}
            </UserInputText>
            <SubmitButton type='submit'>{ mode === "register" && "Register" || "Log in" }</SubmitButton>
            <UserInputText>
            {error !== null && (
              <p>{error}</p>
            )}
            </UserInputText>
          </InputWrapper>
          </form>
        </FormWrapper>
        }
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default Login;

const WelcomeTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 100%;
  border: 1px solid #ACACAC;
  border-radius: 13px;
  padding: 30px;
  background-color: #fafafa;
  font-size: 16px;
  font-weight: 800;
  @media screen and (min-width: 600px) {
    display: none !important;
  }
`
const ShowFormButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-weight: bold;
  .login:hover {
    transform: scale(1.01);
    color: red;
  }
  .signup:hover {
    transform: scale(1.01);
    color: red;
  }
`
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 100%;
  margin-bottom: 20px;
`
const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ACACAC;
  border-radius: 13px;
  gap: 25px; 
  padding: 70px 50px 50px 50px;
  background-color: #fafafa;
`

const InputLabelWrapper = styled.div`
  text-align: left;
`

const Input = styled.input`
  padding: 7px; 
  display: flex;
  flex-direction: column;
  border: 1px solid #ACACAC;
  border-radius: 5px;
  background-color: #fafafa;
  margin-top: 7px;
  font-size: 14px;
`
const Radiobuttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
  label{
   margin-bottom: 30px;
  }
`
const RadioInput = styled.input`
  -webkit-appearance: none;
  font-size: 60px;
  width: 0;
  height: 0;
  text-align: center;
  &:checked {
    visibility:hidden;
  }
`
const LoginHeader = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  @media (min-width: 667px) {
    justify-content: left;
    height: 150px;
  }
`

const SubmitButton = styled.button`
  border: 1px solid #ACACAC;
  background-color: #F5F0F0;
  border-radius: 6px;
  padding: 4px 20px;
  &:hover {
    color: lightgrey;
    background-color: whitesmoke;
    border: 1px solid lightgrey;
  }
  &:active {
    color: white;
    background-color: black;
  }
  }
`
const UserInputText = styled.div`
  color: red;
  font-size: 12px;
`

// const MobileImage = styled.div`
//   width: 100%;
//   margin-bottom: 20px;
//   display: flex;
//   justify-content: center;
//   img {
//     border-radius: 13px;
//     width: 100%;
//   }
//   @media screen and (max-width: 600px) {
//     display: none !important;
//   }
// `

const WebImage = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  position: relative;

  img {
    border-radius: 13px;
    width: 100%;
  }
  .web-img-text {
    margin-right: 200px;
    position: absolute;
    left: 5%;
    top: 7%;
    color: white;
    font-size: 22px;
    padding: 10px;
    font-weight: 600;

    @media screen and (max-width: 600px) {
      display: none !important;
    } 
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`
