import React, { useState } from 'react'

const Anecdote = ({anecdote, votesFor}) => {
  return (
    <>
      <div>
        {anecdote}
      </div>
      <div>
        has {votesFor} votes
      </div>
    </>
  )
}

const selectMostVotes = (votes, currMaxIdx) => {
  return votes.reduce((maxIdx, curr, idx, arr) => {
    if (maxIdx === null || curr > arr[maxIdx]) {
      maxIdx = idx
    }
    return maxIdx
  }, currMaxIdx)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(randomArrSelection(anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(selectMostVotes(votes, null))

  const handleNext = () => {
    setSelected(randomArrSelection(anecdotes.length))
  }

  const handleVote = () => {
    // add 1 to the selected index
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    setMostVotes(selectMostVotes(newVotes, mostVotes))
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote
        anecdote={anecdotes[selected]}
        votesFor={votes[selected]}
      />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNext}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote
        anecdote={anecdotes[mostVotes]}
        votesFor={votes[mostVotes]}
      />
    </>
  )
}

const randomArrSelection = (arrLen) => {
  return Math.floor(Math.random() * arrLen)
}

export default App
