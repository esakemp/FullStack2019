import React from 'react'

const Course = ({ course }) => {

    return (
        <div>
            <h2>{course.name}</h2>
            <Coursecontent coursecontent={course.parts} />
        </div>
    )
}

const Coursecontent = ({ coursecontent }) => {
    console.log(coursecontent[0].name)
    const rows = () =>
        coursecontent.map(course => <li key={course.id}>{course.name} {course.exercises}</li>)

    const ex = coursecontent.map(course => course.exercises)
    console.log(ex)

    const total = ex.reduce((s, p) => s + p)
    console.log(total)

    return (
        <div>
            <p>{rows()}</p>
            <p> yhteensä {total} tehtävää</p>
        </div>
    )
}

export default Course