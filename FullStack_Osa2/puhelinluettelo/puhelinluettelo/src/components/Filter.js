import React from 'react'

const Filter = ({ filter , handleFilterChange}) => {

    return (
        <div>
            <form>
                rajaa näytettäviä <input value={filter} onChange={handleFilterChange} />
            </form>
        </div>
    )
}

export default Filter