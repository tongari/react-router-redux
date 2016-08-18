import React from 'react'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import { API_SUCCESS,API_FAIL } from './action'


export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

export const apiData = (state ={}, action) => {
  switch (action.type) {
    case API_SUCCESS:
      return action.apiData;

    case API_FAIL:
      return 'fail connect'

    default:
      return state;
  }
}


export function configureStore(history, initialState) {

  const reducer = combineReducers({
    apiData,
    routing: routerReducer
  })

  let devTools = []
  if (typeof document !== 'undefined') {
    devTools = [ DevTools.instrument() ]
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      ...devTools
    )
  )

  return store
}
