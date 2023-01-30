import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingleRecipe } from "reducers/recipes";
import { SingleHeader } from "./reusable/SingleHeader";
import { Ingredients } from "./reusable/Ingredients";
import { Instructions } from "./reusable/Instructions";
import { useParams } from "react-router-dom";
import { Header } from "./reusable/Header";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { InnerWrapper, OuterWrapper } from './reusable/global/Wrappers';
import Loading from "./reusable/Loading";

const SingleRecipe = () => {
  const singleRecipe = useSelector((store) => store.recipes.singleRecipe);
  const loading = useSelector((store) => store.recipes.loading);

  const {recipeId} = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateSingleRecipe(recipeId));
  }, []);

return(
  <OuterWrapper>
    <GoBackButton type="button" onClick={() => navigate(-1)}>←</GoBackButton>
    <InnerWrapper>
      <Header />
      {loading && <LoaderWrapper><Loading /></LoaderWrapper>}
      {!loading && (
        <><SingleHeader singleRecipe={singleRecipe} /><SingleRecipeWrapper>
          <IngredientsWrapper>
            <IngredientsCard>
              <Ingredients components={singleRecipe?.sections[0].components || []} />
            </IngredientsCard>
          </IngredientsWrapper>
          <InstructionsWrapper>
            <InstructionsCard>
              <Instructions instructions={singleRecipe?.instructions || []} />
            </InstructionsCard>
          </InstructionsWrapper>
        </SingleRecipeWrapper></>
      )}
    </InnerWrapper>
  </OuterWrapper>
)
}

export default SingleRecipe;


const GoBackButton = styled.button`
  display: none;
  align-self: flex-start;
  margin: 10px 0 0 0;
  font-size: 25px;
  width: 65px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  @media (max-width: 667px) {
    display: none;
  }
`

const SingleRecipeWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 20px;
  font-size: 14px;
  @media (max-width: 667px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const IngredientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const IngredientsCard = styled.div`
  padding: 10px 25px;
  background-color: #FCFCFC;
  border-radius: 13px;
  text-align: left;
  border: #E8E8E8 solid 1px;
  height: min-content;
  @media (max-width: 667px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const InstructionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const InstructionsCard = styled.div`
  padding: 10px 25px;
  background-color: #FCFCFC;
  border-radius: 13px;
  text-align: left;
  border: #E8E8E8 solid 1px;
  height: min-content;
`

const LoaderWrapper = styled.div`
  margin: 0 auto;
  width: 300px;
  padding-top: 70px;
  @media (min-width: 667px) {
  width: 400px;
  padding-top: 50px;
  }
`