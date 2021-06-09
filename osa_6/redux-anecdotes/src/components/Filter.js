import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  
  const filterText = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filterText} onChange={handleChange} />
    </div>
  )
}

export default Filter