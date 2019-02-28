import React from 'react'

const AnecdoteList = props => {
  const anecdotes = props.store.getState()

  const voteAnecdote = id => {
    props.store.dispatch(vote(id))
  }

  const vote = id => {
    return {
      type: 'VOTE',
      id: id
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
    </div>
  )
}

export default AnecdoteList
