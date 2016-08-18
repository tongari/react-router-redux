import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { configureStore, DevTools } from './store'
import routes from './routes'

const store = configureStore(browserHistory, window.__initialState__)
const history = syncHistoryWithStore(browserHistory, store)

const onUpdate = () => {
  // console.log('onUpdate : ',store.getState().routing.locationBeforeTransitions.pathname);
}

render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={onUpdate} />
  </Provider>,
  document.getElementById('app')
)

render(
  <Provider store={store}>
    <DevTools/>
  </Provider>,
  document.getElementById('devtools')
)
