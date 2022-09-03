import React from "react";
import "./todayDiary.css";
import { useState } from "react";

const TodayDiary = () => {
  const [state, setState] = useState({
    title: "",
    description: "",
    score: "3",
  })

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='todayDiary'>
      <h2>Today's Dirary</h2>
      <form className='writeForm' onSubmit={(e) => {
        e.preventDefault();
        alert(`title: ${state.title} desc: ${state.description} score: ${state.score}`)
      }}>
        <input
          className='title'
          name='title'
          type='text'
          placeholder='Title'
          value={state.title}
          onChange={onChange}
        />
        <textarea
          className='description'
          name='description'
          cols='30'
          rows='10'
          placeholder='How was today?'
          value={state.description}
          onChange={onChange}
        />
        <label className='score' htmlFor='score'>
          How was today? :
          <select className="selectBox" name='score' value={state.score} onChange={onChange}>
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
export default TodayDiary;
