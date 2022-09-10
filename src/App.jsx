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

  const onRemove = (id) => {
    const newList = list.filter((item) => id !== item.id);
    setList(newList);
  };

  const onUpdate = (id, newDesc) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, description: newDesc } : item
      )
    );
  };

  return (
    <div className='app'>
      <TodayDiary onCreate={onCreate} id={id} />
      <DiaryList list={list} onRemove={onRemove} onUpdate={onUpdate} />
    </div>
  );
}

export default App;
