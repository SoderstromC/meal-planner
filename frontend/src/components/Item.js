import React from "react";
import styled from "styled-components";

const Item = ({ componentData }) => {
  return (
    <>
      <ItemWrapper>
        <div className="item-row">
          <p>{componentData.raw_text}</p>
        </div>
      </ItemWrapper>
    </>
  );
};
export default Item;


const ItemWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  .item-row {
    padding: 25px 0 0 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
  }
`