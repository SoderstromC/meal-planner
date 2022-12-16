import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import styled from "styled-components";

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
    <>
      <OuterWrapper>
        <InnerWrapper>
          <InputWrapper>
          <form onSubmit={onFormSubmit}>
            <h1> { mode === "register" && "Register" || "Log in" } </h1>
            <label htmlFor='username'>Username</label>
            <InputForm
              type='text'
              id='username'
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <InputForm
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && password.length < 8
                ? 'Password must be over 8 characters'
                : ''}
            <button type='submit'>{ mode === "register" && "Register" || "Log in" }</button>
            {error !== null && (
              <p>{error}</p>
            )}
          </form>
          </InputWrapper>
          <Radiobuttons>
          <label htmlFor='register'>{mode === "register" ? "" : "Click here to register" }
          <RadioInput
            type='radio'
            id='register'
            checked={mode === "register"}
            onChange={() => setMode("register")}
          />
          </label>
          <label htmlFor='login'>{mode === "login" ? "" : "Click here to log in" }
          <RadioInput
            type='radio'
            id='login'
            checked={mode === "login"}
            onChange={() => setMode("login")}
          />
          </label>
          </Radiobuttons>
        </InnerWrapper>
      </OuterWrapper>
    </>
  );
};

export default Login;

// {password && password.length < 8
//     ? alert(`password must be over 8 characters`)
//     : ''}

const OuterWrapper = styled.div`
padding: 20px 0 0 0;
`;

const InnerWrapper = styled.div`
  // max-width: 940px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Radiobuttons = styled.div`
display: flex;
flex-direction: row;
margin: 15px;
`

const InputWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 15px;
`

const InputForm = styled.input`
padding: 10px;
display: flex;
flex-direction: column;
`;

const RadioInput = styled.input`
-webkit-appearance: none;
font-size: 60px;
width: 0;
height: 0;
text-align: center;

&:checked {
  visibility:hidden;
}
`;