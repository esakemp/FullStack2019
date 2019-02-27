import React from 'react'

const App = props => {
  const anecdotes = props.store.getState()

  const voteAnecdote = id => {
    props.store.dispatch(vote(id))
  }

  const addAnecdote = event => {
    event.preventDefault()
    props.store.dispatch(createAnecdote(event.target.anecdote.value))
  }

  const vote = id => {
    return {
      type: 'VOTE',
      id: id
    }
  }

  const createAnecdote = anecdote => {
    return {
      type: 'CREATE',
      anecdote: anecdote
    }
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App
