import React, { useState } from 'react'

const Button = ({handleClick, btnText}) => {
  return <button onClick={handleClick}>{btnText}</button>
}

const StatisticLine = ({label, value}) => {
  return <div>{label}: {value}</div>
}

const Statistics = ({good, neutral, bad, total, avgCount}) => {
  if (total > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine label={"good"} value={good} />
        <StatisticLine label={"neutral"} value={neutral} />
        <StatisticLine label={"bad"} value={bad} />
        <StatisticLine label={"total"} value={total} />
        <StatisticLine label={"average"} value={avgCount / total} />
        <StatisticLine label={"positive"} value={`${good / total * 100} %`} />
      </div>
    )
  } else {
    return <p>No feedback given</p>
  }
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