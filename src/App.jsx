import "./App.css";
import TodayDiary from "./components/todayDiary";
import DiaryList from "./components/diaryList";
import React, { useReducer, useRef } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.list;
    }
    case "CREATE": {
      const createdTime = new Date().getTime();
      const newItem = {
        ...action.list,
        createdTime,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((item) => item.id !== action.targetId);
    }
    case "UPDATE": {
      return state.map((item) =>
        item.id === action.targetId
          ? {
              ...item,
              description: action.newDesc,
            }
          : item
      );
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

function App() {
  const [list, dispatch] = useReducer(reducer, []);

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
    dispatch({ type: "INIT", list: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((title, score, description, createdTime) => {
    dispatch({
      type: "CREATE",
      list: { id: dataId.current, title, score, description, createdTime },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onUpdate = useCallback((targetId, newDesc) => {
    dispatch({ type: "UPDATE", targetId, newDesc });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return {onCreate, onRemove, onUpdate}
  }, [])

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = list.filter((item) => item.score > 3).length;
    const badCount = list.length - goodCount;
    const goodRatio = (goodCount / list.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [list]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={list}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className='app'>
          <TodayDiary />
          <div>
            Total Diary: {list.length} <br />
            Good: {goodCount} <br />
            Bad: {badCount} <br />
            goodRatio: {Math.floor(goodRatio)}%
          </div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
