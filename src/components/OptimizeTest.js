import React, { useState, useEffect } from "react";

const CounterA = React.memo(({count}) => {
  useEffect(() => {
    console.log(`Count A: count => ${count}`)
  })
  return <div>{count}</div>
})

const CounterB = ({obj}) => {
  useEffect(() => {
    console.log(`Count B: obj => ${obj.count}`)
  })
  return <div>{obj.count}</div>
}

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count
}

const MemoizedCounterB = React.memo(CounterB, areEqual)

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <CounterA count={count}/>
        <button onClick={() => setCount(count)}> A button</button>
      </div>
      <div>
        <MemoizedCounterB obj={obj}/>
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};

export default OptimizeTest;
