import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const DisplayStatistics = ({good, neutral, bad}) => (
  <>
  <h1>statistics</h1>
  <div>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
  </div>
  </>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }
  const incrementBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={incrementGood} text="good"/>
        <Button handleClick={incrementNeutral} text="neutral"/>
        <Button handleClick={incrementBad} text="bad"/>
      </div>
        <DisplayStatistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App