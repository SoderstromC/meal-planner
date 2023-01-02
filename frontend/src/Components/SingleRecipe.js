import React, { useEffect } from "react";
// import styled from "styled-components";
import  { Ingredients } from "./reusable/Ingredients";
import  { Instructions } from "./reusable/Instructions";

const SingleRecipe = () => {

return(
  <>
   <h1>This is a single recipe</h1>
   <Ingredients/>
   <Instructions/>
  </>
)
}

export default SingleRecipe;


//   // 1. create a useSelector to mapp out path to single recipe data

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