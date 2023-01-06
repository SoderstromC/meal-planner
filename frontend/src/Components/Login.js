import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import styled from "styled-components";
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector(store => store.user.error)

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
             <label htmlFor='login'>{mode === "login" ? "" : "Already got an account? log in" }
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
               />
              {password && password.length < 8
                ? 'Password must be over 8 characters'
                : ''}
             </InputLabelWrapper>
             <button type='submit'>{ mode === "register" && "Register" || "Log in" }</button>
              {error !== null && (
               <p>{error}</p>
              )}
            </InputWrapper>
           </form>
          </FormWrapper>
        </InnerWrapper>
      </OuterWrapper>
  );
};

export default Login;

// {password && password.length < 8
//     ? alert(`password must be over 8 characters`)
//     : ''}

const FormWrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 text-align: center;
 padding: 100px;
`
const InputWrapper = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 border: 1px solid #333;
 gap: 20px; 
 padding: 20px;
`
const InputLabelWrapper = styled.div`
 text-align: left;
`
const Input = styled.input`
 padding: 10px; 
 display: flex;
 flex-direction: column;
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