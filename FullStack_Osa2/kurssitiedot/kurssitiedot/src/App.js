import React from 'react'
import Course from './components/Course'

const App = ({ courses }) => {

  const rows = () => courses.map(course => <Course key={course.id} course={course} />)

  return (
    <div>
      <h1> Opetusohjelma</h1>

      {rows()}

    </div>
  )

}

export default App
