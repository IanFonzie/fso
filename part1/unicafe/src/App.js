import React, { useState } from 'react'

const incrementor = (callback, val) => () => {
  callback(val + 1);
}

const Button = ({handleClick, btnText}) => {
  return <button onClick={handleClick}>{btnText}</button>
}

const Counter = ({label, value}) => {
  return <p>{label}: {value}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementor(setGood, good)} btnText={"good"} />
      <Button handleClick={incrementor(setNeutral, neutral)} btnText={"neutral"} />
      <Button handleClick={incrementor(setBad, bad)} btnText={"bad"} />
      <h2>statistics</h2>
      <Counter label={"good"} value={good}></Counter>
      <Counter label={"neutral"} value={neutral}></Counter>
      <Counter label={"bad"} value={bad}></Counter>
    </div>
  )
}

export default App