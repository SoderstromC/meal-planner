import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import styled from "styled-components";
import { InnerWrapper, OuterWrapper } from "./reusable/global/Wrappers";
import Logo from "../assets/icons/logofoodify.svg";
// import MobileImg from "../assets/icons/mobileImg.jpg";
import IntroImg from "../assets/images/introImg.jpg";

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
        <MobileImage className="mobile-show">
          <img src={MobileImg} />
        </MobileImage>  
        {!showForm &&
        <>
        <ShowFormButton onClick={() => setShowForm(!showForm)}>Login/Signup</ShowFormButton>
        <WelcomeTextWrapper>
            <p>This meal planner tool helps you find inspiration, plan your meals and manage your shopping list.</p>
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
  border-radius: 5px;
  padding: 50px;
  background-color: #fafafa;
`
const ShowFormButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-weight: bold;
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
  border-radius: 5px;
  gap: 20px; 
  padding: 50px;
  background-color: #fafafa;
`
const InputLabelWrapper = styled.div`
  text-align: left;
`
const Input = styled.input`
  padding: 10px; 
  display: flex;
  flex-direction: column;
  border: 1px solid #ACACAC;
  border-radius: 5px;
  background-color: #fafafa;
`

const Radiobuttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
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
  height: 150px;
  align-items: center;
  justify-content: center;
  @media (min-width: 667px) {
    justify-content: left;
    height: 200px;
  }
`
const SubmitButton = styled.button`
  border: 1px solid #ACACAC;
  background-color: #F5F0F0;
  border-radius: 5px;
  padding: 2px 20px;
`
const UserInputText = styled.div`
  color: red;
  font-size: 12px;
`
const MobileImage = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  img {
    border-radius: 5px;
    width: 100%;
  }
  @media screen and (min-width: 600px) {
    display: none !important;
  }
`

// const WebImage = styled.div`
//   @media screen and (min-width: 600px) {
//     position: relative;
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     img {
//       border-radius: 13px;
//       width: 100%;
//       position: absolute;
//       right: 0%;
//       // top: 40%;
// //     }
// //   }
// `
