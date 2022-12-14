import React from "react";

export const RecipeCard = ({id, name, description, time, img}) => {

return(
  <>
  <section>
    <div>{id}</div>
    <div>{name}</div>  
    <div>{time}</div>
    <div>{img}</div>
    <div>{description}</div>  
  </section>
  </>
)
}