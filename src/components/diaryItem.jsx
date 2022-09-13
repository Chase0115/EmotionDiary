import React, { useRef, useState } from "react";
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';
import "./diaryItem.css";

const DiaryItem = ({
  id,
  title,
  score,
  description,
  createdTime,
}) => {

  const {onRemove, onUpdate} = useContext(DiaryDispatchContext)

  const [isUpdate, setIsUpdate] = useState(false);
  const ToggleIsUpdate = () => setIsUpdate(!isUpdate);

  const [updatedContent, setUpdatedContent] = useState(description);

  const contentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`Title: ${title} \n Do you really want to delete?`)) {
      onRemove(id);
    }
  };

  const handleQuitUpdate = () => {
    setUpdatedContent(description);
    ToggleIsUpdate();
  };

  const handleUpdate = () => {
    if (updatedContent.length < 5) {
      contentInput.current.focus();
      return;
    }

    if (window.confirm("Do you want to update diary content?")) {
      onUpdate(id, updatedContent);
      ToggleIsUpdate();
    }
  };

  return (
    <section className='diaryItem'>
      <div className='title'>
        <p>Title:{title}</p>
        <p>Today's feeling: {score}</p>
        <p className='date'>
          Updated: {new Date(createdTime).toLocaleString()}
        </p>
      </div>
      <div className='description'>
        {isUpdate ? (
          <textarea
            ref={contentInput}
            value={updatedContent}
            onChange={(e) => {
              setUpdatedContent(e.target.value);
            }}
          ></textarea>
        ) : (
          description
        )}
      </div>
      {isUpdate ? (
        <div className='Btns'>
          <button onClick={handleQuitUpdate}>Cancel</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div className='Btns'>
          <button onClick={handleRemove}>Delete</button>
          <button onClick={ToggleIsUpdate}>Update</button>
        </div>
      )}
    </section>
  );
};

export default React.memo(DiaryItem);
