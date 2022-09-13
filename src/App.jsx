import "./App.css";
import TodayDiary from "./components/todayDiary";
import DiaryList from "./components/diaryList";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

function App() {
  const [list, setList] = useState([]);

  const dataId = useRef(0);

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
        id: dataId.current++,
      };
    });
    setList(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((title, score, description, createdTime) => {
    const newItem = { id: dataId.current, title, score, description, createdTime };
    dataId.current += 1
    setList((list) => [newItem, ...list]);
  }, []);

  const onRemove = useCallback((id) => {
    setList((list) => list.filter((item) => id !== item.id));
  }, []);

  const onUpdate = useCallback((id, newDesc) => {
    setList((list) =>
      list.map((item) =>
        item.id === id ? { ...item, description: newDesc } : item
      )
    );
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = list.filter((item) => item.score > 3).length;
    const badCount = list.length - goodCount;
    const goodRatio = (goodCount / list.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [list]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className='app'>
      <TodayDiary onCreate={onCreate} />
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
