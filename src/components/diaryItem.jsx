import React from "react";
import "./diaryItem.css";

const DiaryItem = ({ title, score, description, createdTime }) => {
  return (
    <section className='diaryItem'>
      <div className='title'>
        <p>Title:{title}</p>
        <p>Today's feeling: {score}</p>
        <p className='date'>Updated: {new Date(createdTime).toLocaleString()}</p>
      </div>
      <div className='description'>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default DiaryItem;
