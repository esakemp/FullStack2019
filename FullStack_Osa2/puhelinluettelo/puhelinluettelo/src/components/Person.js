import React from 'react'

const Person = ({ deletePerson, person }) => {
    return (
        <div>
            {person.name} {person.number} <button type='submit'
                value={person.name} onClick={deletePerson}
                id={person.id}>delete</button>
        </div>
    )
}

export default Person