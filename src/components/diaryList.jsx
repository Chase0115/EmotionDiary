import React from "react";
import { useContext } from "react";
import { DiaryStateContext } from "../App";
import DiaryItem from "./diaryItem";
import "./diaryList.css";

const DiaryList = () => {
  const list = useContext(DiaryStateContext);

  return (
    <div className='diaryList'>
      <h2>Diary List</h2>
      <p>{list.length} items on the list</p>
      <div className='diaryItems'>
        {list.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
