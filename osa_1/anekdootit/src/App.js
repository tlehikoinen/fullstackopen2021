import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const IncrementVote = () => {
      const voteCopy = {...votes}
      voteCopy[selected]+=1
      setVotes(voteCopy)
  }

  const RandomStateNumber = () => setSelected(Math.floor(Math.random()*6))

  return (
    <div>
        {anecdotes[selected]}
        <br/>
        has {votes[selected]} votes
      <div>
        <Button handleClick={IncrementVote} text="vote"/>
        <Button handleClick={RandomStateNumber} text="new anecdote"/>
      </div>
   </div>
  )
}

export default App