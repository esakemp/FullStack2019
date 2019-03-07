import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteA } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const voteAnecdote = anecdote => {

    props.setNotification(`voted anecdote '${anecdote.content}'`, 5)

    props.voteA(anecdote)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter store={props.store} />
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const filteredAnecdotes =({anecdotes, filter}) => {
  if(filter==='') {
    return anecdotes
  }
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().match(filter.toLowerCase()))
} 

const mapStateToProps = (state) => {

  return {
    anecdotesToShow: filteredAnecdotes(state)
  }
}

const mapDispatchToProps = {
  voteA,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes