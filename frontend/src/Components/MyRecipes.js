import React, { useState, useEffect } from 'react';
import Nav from "./reusable/Nav";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


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

    return (
      <>
      <Nav />
      <SavedRecipesContainer>
      <h1>My saved recipes</h1>
      {recipeList.map((recipe) => {
      return (
        <Link
            className="recipe-container"
            id={recipe.id}
            to={`/single/${recipe.id}`}
            key={recipe.id}>
          <p>{recipe.name}</p>
      </Link>
      )
      })}
        <div> 
              <p>Core problems to solve:</p> 
              <li>User can see which recipes they have saved</li>
              <li>User can generate a shopping list</li>
        </div>
      </SavedRecipesContainer>
      </>
    ) 
}

export default MyRecipes;

const SavedRecipesContainer = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
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