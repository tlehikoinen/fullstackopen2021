import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({feedbacks}) => {

  console.log("good", feedbacks.good)
  console.log("neutral", feedbacks.neutral)
  console.log("bad", feedbacks.bad)
  console.log(Object.keys(feedbacks));


  return (
  <>
  <p>what</p>
  </>
  )
}



const DisplayFeedback = ({good, neutral, bad}) => { 
  let totalFeedbacks = good + neutral + bad
  let allFeedbacks = {"good":good, "neutral":neutral, "bad":bad}

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
    <Statistics feedbacks = {allFeedbacks}/>
  </div>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)
  

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={incrementGood} text="good"/>
        <Button handleClick={incrementNeutral} text="neutral"/>
        <Button handleClick={incrementBad} text="bad"/>
      </div>
        <h1>statistics</h1>
        <DisplayFeedback good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App