import React from 'react'

const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault()
    props.store.dispatch(createAnecdote(event.target.anecdote.value))

  }
  const createAnecdote = anecdote => {
    return {
      type: 'CREATE',
      anecdote: anecdote
    }
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
