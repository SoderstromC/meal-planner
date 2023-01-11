import React from "react";
import styled from "styled-components";


const Item = ({ componentData }) => {

  return(
    <>
   <ItemWrapper>
       <div className="item-row">
        
      {/* <CheckButton
        role="button"
        onClick={() => onIsCompletedToggle(componentData.id)}
        complete={componentData.isCompleted}
        aria-label={
          componentData.isCompleted
            ? 'task complete. press enter to toggle.'
            : 'task incomplete. press enter to toggle.'
        }>
        {componentData.isCompleted ? '' : <IncompleteCheckIcon src={Check} />}
        {componentData.isCompleted ? <CheckIcon src={Check} /> : ''}
      </CheckButton> */}

      <p>{componentData.raw_text}</p>
       {/* <RemoveButton
        type="submit"
        onClick={() => onRemoveTask(taskData.id)}
        aria-label="Remove task">
        <span className="trash">
          <span src={Trash} />
          <i src={Lid} />
        </span>
      </RemoveButton> */}
    </div>
    </ItemWrapper>
    </>
  );
};
export default Item;


const ItemWrapper = styled.div`
  // border-bottom: 3px solid var(--border);
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