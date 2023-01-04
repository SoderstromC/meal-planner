import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import shopping from 'reducers/shopping'
import Nav from "./reusable/Nav";
import uniqid from 'uniqid'
import styled from 'styled-components/macro'


const ShoppingList = () => {
  const dispatch = useDispatch()
  const shoppingList = useSelector((store) => store.shopping.items)

  const onIsCompletedToggle = (id) => {
    dispatch(shopping.actions.toggleItem(id))
  }

  const onDeleteButtonClick =
  (shoppingIndex) => {
    dispatch(shopping.actions.deleteItem(shoppingIndex))
  }

  return (
    <>
    <Nav />
    <Wrapper>
      <ListWrapper>
        <ComponentTitle>This is my shopping list</ComponentTitle>
          {shoppingList.map((shoppingItem, index) => {
            return (
              <ArticleWrapper key={shoppingItem.id}>
                  <h2>{shoppingItem.name}</h2>
                <TodoWrapper>
                  <label>
                    <CheckBox
                      type="checkbox"
                      checked={shoppingItem.isCompleted}
                      onChange={() => onIsCompletedToggle(shoppingItem.id)} />
                  </label>
                  <DeleteButton
                    onClick={() => onDeleteButtonClick(index)}
                    type="button">&#128465;&#65039;
                  </DeleteButton>
                </TodoWrapper>
              </ArticleWrapper>
            )
          })}
          <NewListItem />
      </ListWrapper>
    </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
`

const ListWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ComponentTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 30px;
`

const ArticleWrapper = styled.article`
  display: flex;
  justify-content: space-between;
  width: 50%;
  // padding: 10px;
`
const TodoWrapper = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  h2{
  font-size: 20px;
  }
  @media (max-width: 668px){
    padding-left: 5px;
    h2{
      font-size: 15px;
    }
  }
`
const DeleteButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: whitesmoke;
  border: none;
  border-radius: 50%;
  margin-top: 5px;
  @media (max-width: 668px){
    width: 35px;
    height: 35px;
  }
`
const CheckBox = styled.input`
  cursor: pointer;
  appearance: none;
  margin: 5px;
  margin-right: -42px;
  font: inherit;
  color: white;
  width: 2em;
  height: 2em;
  border: 0.15em solid black;
  margin-top: 15px;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  &::before {
    content: '';
    width: 1em;
    height: 1em;
    transform: scale(0);
    border-radius: 50%;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em black;
  }
  &:checked::before {
    transform: scale(1);
  }
  @media (max-width: 668px){
    margin-right: 10px;
    width: 1em;
    height: 1em;
  }
`
const NewListItem = () => {
  const dispatch = useDispatch()
  const [newListItem, setNewListItem] = useState('')

  const onFormSubmit = (event) => {
    event.preventDefault()
    const postNewListItem = {
      id: uniqid(),
      name: newListItem,
      isCompleted: false
    }
    dispatch(shopping.actions.addItem(postNewListItem))
    setNewListItem('')
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <LabelWrapper>
          <p>New Item</p>
          <InputField type="text" value={newListItem} onChange={(event) => setNewListItem(event.target.value)} />
          <AddButton type="submit">Add Shopping Item</AddButton>
        </LabelWrapper>
      </form>
    </div>
  )
}

const LabelWrapper = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 40px 0px;
  padding: 5px;
  border: none;
  p{
    font-weight: 700;
    font-size: 20px;
    margin-right: 5px;
  }
  @media (max-width: 668px){
    flex-direction: column;
    margin: 10px;
    padding: 0px;
    p{
      font-size: 17px;
      margin-right: 0px;
    }
  }
`
const AddButton = styled.button`
  width: 125px;
  height: fit-content;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: unset;
  margin: 10px;
  padding: 5px;
  text-transform: lowercase;
  font-weight: 700;
  @media (max-width: 668px){
    width: 100px;
  }
`
const InputField = styled.input`
  width: 225px;
  height: 25px;
  border: solid 1px black;
  margin: 5px;
  @media (max-width: 668px){
    width: 150px;
  }
`

export default ShoppingList