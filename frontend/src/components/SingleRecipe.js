import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSingleRecipe } from "reducers/recipes";
import { SingleHeader } from "./reusable/SingleHeader";
import  { Ingredients } from "./reusable/Ingredients";
import  { Instructions } from "./reusable/Instructions";
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
              <h2>Ingredients</h2>
              <IngredientsCard>
                <Ingredients components={singleRecipe?.sections[0].components || []} />
              </IngredientsCard>
            </IngredientsWrapper>
            <InstructionsWrapper>
              <h2>Instructions</h2>
              <InstructionsCard>
                <Instructions instructions={singleRecipe?.instructions || []} />
              </InstructionsCard>
            </InstructionsWrapper>
          </SingleRecipeWrapper></>
        )}
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default SingleRecipe;

const GoBackButton = styled.button`
  align-self: flex-start;
  margin: 10px 0px 0px 0px;
  font-size: 25px;
  width: 65px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
`

const SingleRecipeWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 20px;
  font-size: 14px;
`

const IngredientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h2{
    font-size: 17px;
    margin-left: 20px;
  }
`

const IngredientsCard = styled.div`
  padding: 10px 25px;
  background-color: rgb(252, 252, 252);
  border-radius: 13px;
  text-align: left;
  border: rgb(232, 232, 232) solid 1px;
  height: 550px;
  }
`

const InstructionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h2{
    font-size: 17px;
    margin-left: 20px;
  }
`

const InstructionsCard = styled.div`
  padding: 10px 25px;
  background-color: rgb(252, 252, 252);
  border-radius: 13px;
  text-align: left;
  border: rgb(232, 232, 232) solid 1px;
  height: 550px;
  }
`

const LoaderWrapper = styled.div`
  width: 300px;
  height: 300px;
`