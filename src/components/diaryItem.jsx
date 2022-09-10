import React from "react";
import "./diaryItem.css";

const DiaryItem = ({
  id,
  title,
  score,
  description,
  createdTime,
  onDelete,
}) => {
  const onClick = (e) => {
    e.preventDefault();
    if (e.target.textContent === "Delete") {
      if (window.confirm(`Title: ${title} \n Do you really want to delete? `)) {
        onDelete(id);
      }
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
        <p>{description}</p>
      </div>
      <div className='Btns'>
        <button onClick={onClick}>Delete</button>
        <button onClick={onClick}>Update</button>
      </div>
    </section>
  );
};

export default DiaryItem;
