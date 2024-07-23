import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const buttonDispatch = (actionType) => {
    store.dispatch({
      type: actionType,
    })
  }

  return (
    <div>
      <button onClick={() => buttonDispatch('GOOD')}>good</button>
      <button onClick={() => buttonDispatch('OK')}>ok</button>
      <button onClick={() => buttonDispatch('BAD')}>bad</button>
      <button onClick={() => buttonDispatch('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
