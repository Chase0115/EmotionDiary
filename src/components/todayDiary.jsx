import React from "react";
import "./todayDiary.css";
import { useRef, useState } from "react";
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';

const TodayDiary = () => {

  const {onCreate} = useContext(DiaryDispatchContext)

  const [state, setState] = useState({
    title: "",
    description: "",
    score: "3",
  });

  const titleInput = useRef();
  const description = useRef();

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.title.length < 1) {
      titleInput.current.focus();
      return;
    }

    if (state.description.length < 5) {
      description.current.focus();
      return;
    }

    onCreate(state.title, state.score, state.description, state.createdTime);

    setState({
      title: "",
      description: "",
      score: "3",
    });

    alert("Saved Today's Diary");
  };

  return (
    <div className='todayDiary'>
      <h2>Today's Diary</h2>
      <form
        className='writeForm'
        onSubmit={(e) => {
          onSubmit(e, state.description);
        }}
      >
        <input
          className='title'
          ref={titleInput}
          name='title'
          type='text'
          placeholder='Title'
          value={state.title}
          onChange={onChange}
        />
        <textarea
          className='description'
          ref={description}
          name='description'
          cols='30'
          rows='10'
          placeholder='How was today?'
          value={state.description}
          onChange={onChange}
        />
        <label className='score' htmlFor='score'>
          How was today? :
          <select
            className='selectBox'
            name='score'
            value={state.score}
            onChange={onChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <input type='submit' value='Save' />
      </form>
    </div>
  );
};
export default React.memo(TodayDiary);
