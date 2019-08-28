import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({text, statistics}) => {
  return (
    <p>{text}: {statistics}</p>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    console.log('object');
    setAll(all + 1)
    setAverage(average + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(all + 1)
    setAverage(average + 0)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(all + 1)
    setAverage(average - 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h2>Statistics</h2>
      {all > 0 ? 
        <>
          <Statistics text="Good" statistics={good} />
          <Statistics text="Neutral" statistics={neutral} />
          <Statistics text="Bad" statistics={bad} />
          <Statistics text="All" statistics={all} />
          <Statistics text="Average" statistics={all > 0 ? average / all : 0} />
          <Statistics text="Positive" statistics={(all > 0 ? (good * 100 / all) : 0) + '%'} />
        </>
        : <p>No feedback given</p>}
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)