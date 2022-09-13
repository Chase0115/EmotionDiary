import "./App.css";
import TodayDiary from "./components/todayDiary";
import DiaryList from "./components/diaryList";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

function App() {
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((item) => {
      return {
        title: item.name,
        description: item.body,
        score: Math.floor(Math.random() * 5) + 1,
        createdTime: new Date().getTime(),
        id: item.id,
      };
    });
    setList(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((title, score, description, createdTime) => {
    const newItem = { id, title, score, description, createdTime };
    setId(id + 1);
    setList((list) => [newItem, ...list]);
  }, []);

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

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = list.filter((item) => item.score > 3).length;
    const badCount = list.length - goodCount;
    const goodRatio = (goodCount / list.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [list]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className='app'>
      <TodayDiary onCreate={onCreate} id={id} />
      <div>
        Total Diary: {list.length} <br />
        Good: {goodCount} <br />
        Bad: {badCount} <br />
        goodRatio: {Math.floor(goodRatio)}%
      </div>
      <DiaryList list={list} onRemove={onRemove} onUpdate={onUpdate} />
    </div>
  );
}

export default App;
