import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('test', action)
  switch (action.type) {
    case 'VOTE':
      const anecdoteIndex = state.findIndex(anec => anec.id === action.data.id)
      state[anecdoteIndex].votes += 1
      state = sortlist(state)
      return [...state]

    case 'CREATE':
      const newAnecdote = action.data
      return [...state, newAnecdote]

    case 'INIT_ANECDOTES':
      return sortlist(action.data)
    default:
      return state
  }
}

const sortlist = list => {
  return list.sort(function(a,b){
    return b.votes - a.votes
  })
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)

    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }

  
}

export const voteA = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(anecdote)

    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
