import "./App.css";
import TodayDiary from "./components/todayDiary";
import DiaryList from "./components/diaryList";
import { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);

  const onCreate = (title, score, description, createdTime) => {
    const newItem = { id: id, title, score, description, createdTime };
    setId(id + 1);
    setList([newItem, ...list]);
  };

  return (
    <div className='app'>
      <TodayDiary onCreate={onCreate} />
      <DiaryList list={list} />
    </div>
  );
}

export default App;
