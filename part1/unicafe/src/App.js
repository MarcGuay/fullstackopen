import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total > 0){
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="total" value ={total} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive} />
        </tbody>
      </table>
    )
  }
  return (
    <div>No feedback given</div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const incrementGood = () => {
    const newGood = good + 1
    setGood(newGood)
    doCalcs(newGood, bad)
  }

  const incrementNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    doCalcs(good, bad)
  }

  const incrementBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    doCalcs(good, newBad)
  }

  const doCalcs = (g, b) => {
    const newTotal = total + 1
    setTotal(newTotal)
    setAverage(calcAverage(g, b, newTotal))
    setPositive(calcPositive(g, newTotal))
  }

  const calcAverage = (g, b, t) => {
    return (g - b) / t;
  }

  const calcPositive = (g, t) => {
    return g / t * 100 + '%';
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={incrementGood} text="good" />
      <Button onClick={incrementNeutral} text="neutral" />
      <Button onClick={incrementBad} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App