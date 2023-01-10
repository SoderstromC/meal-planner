import React, { useState, useEffect } from 'react';
import Nav from "./reusable/Nav";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';

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
          <Nav />
          <SavedRecipesContainer>
            <h3>My saved recipes</h3>
          <RecipeListWrapper>
          { console.log('new recipe list', recipeList) }
          {recipeList.map((recipe) => {
           return (
           <>
           <SingleRecipeWrapper>
            <Link
              className="recipe-container"
              id={recipe.id}
              to={`/single/${recipe.id}`}
              key={recipe.id}>
             <p>{recipe.name}</p>
           </Link>
           <button onClick={() => buttonClickRemove(recipe.id)}>Remove</button> 
           {/*chnged to arrow function*/}
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
margin-top: 50px;
`

const RecipeListWrapper = styled.div`
 width: 100%;
`
const SingleRecipeWrapper = styled.div`
display: flex;
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