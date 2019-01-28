import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  
  const total = props.good + props.bad + props.neutral
  const mean = (props.good + props.bad*-1)/(total)
  const positive = props.good/total

  if(props.good + props.bad + props.neutral === 0) {
    return(
      <div>
        Ei yhtään palautetta annettu
      </div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>yhteensä</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{mean}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positive}</td>
          </tr>
        </tbody>
      </table>      
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <p>
        <b>anna palautetta</b>
      </p>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="hyvä"/>
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutraali"/>
        <Button handleClick={() => setBad(bad + 1)} text="huono"/>
      </div>
      <div>
        <p>
          <b>statistiikka</b>
        </p>
      </div>
      <div>
        <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
