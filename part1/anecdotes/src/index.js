import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdotes, votes, index}) => {
  return (
    <>
      <p>{anecdotes[index]}</p>
      <p>has {Number.isInteger(votes[index]) ? votes[index] : 0} votes</p>
    </>
  )
}


const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxVote, setMaxVote] = useState(0)

  const getRandom = () => {
    setSelected(Math.floor((Math.random() * anecdotes.length - 1) + 1))
  }

  const handleVote = (index) => {
    const newVotes = [...votes]
    newVotes[index] += 1

    setVotes(newVotes)
    setMaxVote(Math.max.apply(Math, newVotes))
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <Anecdote anecdotes={anecdotes} votes={votes} index={selected} />
      
      <button onClick={() => {
        handleVote(selected)
      }}>Vote</button>
      <button onClick={getRandom}>Next anecdote</button>

      {maxVote > 0 ? (
        <>
        <h3>Anecdote with most votes</h3>
        <Anecdote anecdotes={anecdotes} votes={votes} index={votes.indexOf(maxVote)} />
        </>
      ) : ''}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)