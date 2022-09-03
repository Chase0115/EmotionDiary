import React from "react";
import "./todayDiary.css";
import { useState } from "react";

const TodayDiary = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState('3')

  return (
    <div className='todayDiary'>
      <h2>Today's Dirary</h2>
      <form className='writeForm' onSubmit={(e) => {
        e.preventDefault();
        alert(`title: ${title} desc: ${description} score: ${score}`)
        setTitle('')
        setDescription('')
        setScore('3')
      }}>
        <input
          className='title'
          name='title'
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => {
            let title = e.target.value;
            setTitle(title)}}
        />
        <textarea
          className='description'
          name='description'
          cols='30'
          rows='10'
          placeholder='How was today?'
          value={description}
          onChange={(e) => {
            let desc = e.target.value;
            setDescription(desc);
          }}
        />
        <label className='score' htmlFor='todayScore'>
          How was today? :
          <select className="selectBox" name='todayScore' value={score} onChange={(e) => {
            setScore(e.target.value)
          }}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </label>

        <input type='submit' value='Save' />
      </form>
    </div>
  );
};
export default TodayDiary;
