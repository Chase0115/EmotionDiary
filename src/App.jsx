import "./App.css";
import TodayDiary from "./components/todayDiary";
import DiaryList from "./components/diaryList";
import { useState } from "react";
import { useEffect } from "react";

//https://jsonplaceholder.typicode.com/comments

function App() {
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    
    const initData = res.slice(0,20).map((item) => {
      return {
        title: item.name,
        description: item.body,
        score: Math.floor(Math.random() * 5 ) + 1,
        createdTime: new Date().getTime(),
        id: item.id,
      }
    })
    setList(initData)
  };

  useEffect(() => {
    getData();
  }, []);

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
