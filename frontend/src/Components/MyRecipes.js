import React, { useState, useEffect } from 'react';
import { Header } from "./reusable/Header";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const MyRecipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const userId = useSelector((store) => store.user.userId);

  //const [loading, setLoading] = useState(false);

  const fetchMyRecipes = () => {
    const MY_RECIPES_URL = `http://localhost:8090/saveRecipe/${userId}`;

    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ userId: userId })
    };

    //setLoading(true);
    fetch(MY_RECIPES_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data.response)
        console.log('data.response', data.response)})
      .catch((error) => console.error('error1', error));
      //.finally(() => setLoading(false))
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  // REMOVE RECIPE FROM SAVED RECIPES
  const buttonClickRemove = (id) => {
    const REMOVE_RECIPE_URL = `http://localhost:8090/removeRecipe`;
    console.log('idTEST', id)
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, userId: userId }) 
      //we only need id and userId not name since we are removing and only need to find the id
    };
    // remove recipe from user
    fetch(REMOVE_RECIPE_URL, options) 
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data.response)
      })
      .catch((error) => console.error("error2", error));
  };

    return (
      <OuterWrapper>
        <InnerWrapper>
          <Header />
          <SavedRecipesContainer>
            <h3>My recipes</h3>
          <RecipeListWrapper>
          { console.log('new recipe list', recipeList) }
          {recipeList.map((recipe) => {
           return (
           <>
           <SingleRecipeWrapper>
            <LinkWrapper>
            <Link
              className="recipe-container"
              id={recipe.id}
              to={`/single/${recipe.id}`}
              key={recipe.id}>
             <p>{recipe.name}</p>
           </Link>
           </LinkWrapper>
           <ButtonWrapper>
           <RemoveButton onClick={() => buttonClickRemove(recipe.id)}>
            <FontAwesomeIcon className="trash-icon" icon={faTrashCan} />
           </RemoveButton> 
           {/*chnged to arrow function*/}
           </ButtonWrapper>
           </SingleRecipeWrapper>
           </>
          )
         })}
        </RecipeListWrapper>
      </SavedRecipesContainer>
     </InnerWrapper>
  </OuterWrapper>
    ) 
}

export default MyRecipes;

const SavedRecipesContainer = styled.div`
width: 100%;
`
const RecipeListWrapper = styled.div`
 width: 100%;
 border: 1px solid #333;
 border-radius: 5px;
 padding: 30px;
 margin-top: 10px;
`
const SingleRecipeWrapper = styled.div`
display: flex;
`
const LinkWrapper = styled.div`
 width: 50%;
`
const ButtonWrapper = styled.div`
 width: 50%;
 display: flex;
 justify-content: flex-end;
`
const RemoveButton = styled.button`
 background-color: transparent;
 border: none;
 cursor: pointer;

 .trash-icon {
  color: red;
 }

 &:hover {
  transform: scale(1.2);
 }
`


/**   const handleNewLikeSubmit = (tweetId) => {
    console.log('tweetId', tweetId)
    const options = {
      method: 'PATCH'
    };

    // Increases likes count on server for uniq tweet id
    fetch(LIKES_URL(tweetId), options) // Catch the data and update with uniqe object (option)
      .then((res) => res.json())
      .then((data) => {
        fetchTweets(data)
        console.log('data2', data); // Gets/request all data again
      })
      .catch((error) => console.error('error2', error));
  };

  return (
    <section className="container">
      <TweetForm
        newTweet={newTweet}
        onNewTweetChange={handleNewTweetChange}
        handleFormSubmit={handleFormSubmit} />
      <TweetList
        loading={loading}
        tweetList={tweetList}
        onNewLikeSubmit={handleNewLikeSubmit} />
    </section>
  );
};*/