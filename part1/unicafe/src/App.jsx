import { useState } from 'react'


const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.Value}</td>
    </tr>
  )
}

const Statastics = ({good , neutral , bad}) => {
  if ((good + bad + neutral)===0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" Value={good}/>
          <StatisticLine text="neutral" Value={neutral}/>
          <StatisticLine text="bad" Value={bad}/>
          <StatisticLine text="all" Value={good + neutral + bad}/>
          <StatisticLine text="average" Value={(good*1 + bad*-1)/(good + neutral + bad)}/>
          <StatisticLine text="positive" Value={good*100/(good + neutral + bad) + " %"}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  function handleGood() {
    setGood(g => g + 1)
  }
  function handleNeutral() {
    setNeutral(n => n + 1)
  }
  function handleBad() {
    setBad(b => b + 1)
  }
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      
      <Statastics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App