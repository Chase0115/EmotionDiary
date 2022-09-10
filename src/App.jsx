import "./App.css";
import TodayDiary from "./components/todayDiary";
import DiaryList from "./components/diaryList";
import { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);

  const onCreate = (title, score, description, createdTime) => {
    const newItem = { id, title, score, description, createdTime };
    setId(id + 1);
    setList([newItem, ...list]);
  };

  const onDelete = (id) => {
    const newList = list.filter((item) => id !== item.id);
    setList(newList);
  };

  return (
    <div className='app'>
      <TodayDiary onCreate={onCreate} id={id}/>
      <DiaryList list={list} onDelete={onDelete} />
    </div>
  );
}

export default App;
