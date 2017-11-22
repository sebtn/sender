import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import style from '../styles/index.scss'
import Root from './Root'
import Reducers from './reducers/index'
import Middlewares from './middlewares'

const store = createStore(Reducers, Middlewares)

const WrappedRoot = (
<AppContainer>
  <Provider store={store}>
  <Router>
    <Root />
  </Router>
  </Provider>
</AppContainer>
)

const element = document.querySelector('#root')
ReactDOM.render(WrappedRoot, element)

if ( module && module.hot ) {
  module.hot.accept('./Root', () => {
    ReactDOM.render(WrappedRoot, element)
  })
}
