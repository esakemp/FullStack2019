import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleFilterChange = event => {
        props.changeFilter(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleFilterChange} />
        </div>
    )
}

const mapDispatchToProps = {
    changeFilter
}

const ConnnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnnectedFilter