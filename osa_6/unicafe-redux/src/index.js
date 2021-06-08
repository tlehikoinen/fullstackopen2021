import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const dispatchState = (state) => {
    return () => {
      store.dispatch({
        type: state
      })
    }
  }

  return (
    <div>
      <button onClick={dispatchState('GOOD')}>good</button> 
      <button onClick={dispatchState('OK')}>neutral</button> 
      <button onClick={dispatchState('BAD')}>bad</button>
      <button onClick={dispatchState('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)