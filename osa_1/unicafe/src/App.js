import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



const Statistics = ({good, neutral, bad}) => { 
  let totalFeedbacks = good + neutral + bad
  let totalSum = (good*1) + (neutral*0) + (bad*-1)
  let positiveFeedbacks = (good/totalFeedbacks*100)

  if(totalFeedbacks === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }else
  return (
  <div>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {totalFeedbacks}</p>
    <p>average {totalSum/totalFeedbacks}</p>    
    <p>positive {positiveFeedbacks} %</p>
  </div>
  )
}



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
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App