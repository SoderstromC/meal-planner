import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingleRecipe } from "reducers/recipes";
import { SingleHeader } from "./reusable/SingleHeader";
import  { Ingredients } from "./reusable/Ingredients";
import  { Instructions } from "./reusable/Instructions";
import { useParams } from "react-router-dom";
import Nav from "./reusable/Nav";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SingleRecipe = () => {
  const singleRecipe = useSelector((store) => store.recipes.singleRecipe);
  console.log('singleRecipe', singleRecipe)

  const {recipeId} = useParams();
  console.log('id', recipeId)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateSingleRecipe(recipeId));
  }, []);

return(
  <OuterWrapper>
    <GoBackButton type="button" onClick={() => navigate(-1)}>←</GoBackButton>
    <InnerWrapper>
      <Nav />
        {/* <Placeholder>
        <h1>This is a single recipe placeholder for</h1>
        <p>Recipe image</p>
        <p>Recipe title</p>
        <p>Recipe cooking time</p>
        </Placeholder> */}
        <SingleHeader singleRecipe = {singleRecipe}/>
        <SingleRecipeWrapper>
          <IngredientsWrapper>
            <h2>Ingredients</h2>
            <IngredientsCard>
              <Ingredients components = {singleRecipe?.sections[0].components || []}/>
            </IngredientsCard>
          </IngredientsWrapper>
          <InstructionsWrapper>
            <h2>Instructions</h2>
            <InstructionsCard>
              <Instructions instructions = {singleRecipe?.instructions || []}/>
            </InstructionsCard>
        </InstructionsWrapper>
      </SingleRecipeWrapper>
    </InnerWrapper>
  </OuterWrapper>
)
}

export default SingleRecipe;

const OuterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const GoBackButton = styled.button`
  align-self: flex-start;
  margin: 10px 0px 0px 0px;
  font-size: 25px;
  width: 65px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  // display: none;
`

const InnerWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`

const SingleRecipeWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 20px;
  padding: 10px;
  font-size: 14px;
`
const Placeholder = styled.div`
width: 100%;
height: 200px;
padding: 10px;
background-color: linen;
color: black;
border-radius: 13px;
text-align: center;
margin-top: 15px;
  h1{
    font-size: 17px;
    margin-top: 30px;
  }
  p{
    font-size: 13px;
  }
`
const IngredientsWrapper = styled.div`
display: flex;
flex-direction: column;
h2{
  font-size: 15px;
  margin-left: 20px;
}
`
const IngredientsCard = styled.div`
padding: 10px 25px;
background-color: whitesmoke;
border-radius: 13px;
text-align: left;
border: lightgrey solid 1px;
height: 550px;
}
`
const InstructionsWrapper = styled.div`
display: flex;
flex-direction: column;
h2{
  font-size: 15px;
  margin-left: 20px;
}
`
const InstructionsCard = styled.div`
padding: 10px 25px;
background-color: whitesmoke;
border-radius: 13px;
text-align: left;
border: lightgrey solid 1px;
height: 550px;
}
`


//   // 1. create a useSelector to mapp out path to single recipe data//CHECK

//   // 2. build a function in reducer to fetch single recipe api (based on recipe-id)

//   // 3. call the function in the reducer through a dispatch and put it in a useEffect to prevent fetch loop

//   // 4. map out the recipe in return() to access specific data and display in our frontend

//   // 5. create path from recipes in our RecipeList component to the single recipe (see Movie project)

//   // 6. create a go back button to return back to the list from the single recipe (see Movie project)


//     return (
//       <SingleRecipeContainer>
//         <div>
//           <h1>This is our single recipe page</h1>
//           <p>Core problems to solve:</p> 
//               <li>User can se recipe details: ingredients, how to</li>
//               <li>User can save a recipe</li>
//               <li>User can generate shopping list</li>
//         </div>
//       </SingleRecipeContainer>

//     ) 
// }

// export default SingleRecipe;

// const SingleRecipeContainer = styled.div`
// width: 100%;
// height: 100vh;
// display: flex;
// justify-content: center;
// align-items: center;
// `