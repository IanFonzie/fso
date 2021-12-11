import React, { useState } from 'react'

const Button = ({handleClick, btnText}) => {
  return <button onClick={handleClick}>{btnText}</button>
}

const Counter = ({label, value}) => {
  return <div>{label}: {value}</div>
}

const RatioDisplay = ({label, count, total}) => {
  return <div>{label}: {count / total}</div>
}

const AvgDisplay = ({label, count, total}) => {
  return <div>{label}: {count / total * 100} %</div>
}

const Statistics = ({good, neutral, bad, total, avgCount}) => {
  return (
    <div>
      <h1>statistics</h1>
      <Counter label={"good"} value={good} />
      <Counter label={"neutral"} value={neutral} />
      <Counter label={"bad"} value={bad} />
      <Counter label={"total"} value={total} />
      <RatioDisplay label={"average"} count={avgCount} total={total} />
      <AvgDisplay label={"positive"} count={good} total={total} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avgCount, setAvgCount] = useState(0)
  const [total, setTotal] = useState(0)

  const statUpdater = (callback, val, modifier) => () => {
    callback(val + 1)
    setAvgCount(avgCount + modifier)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        handleClick={statUpdater(setGood, good, 1)} 
        btnText={"good"} 
      />
      <Button
        handleClick={statUpdater(setNeutral, neutral, 0)}
        btnText={"neutral"}
      />
      <Button
        handleClick={statUpdater(setBad, bad, -1)}
        btnText={"bad"}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avgCount={avgCount}
      />
    </div>
  )
}

export default App