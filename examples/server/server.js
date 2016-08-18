/*eslint-disable no-console */
import express from 'express'
import serialize from 'serialize-javascript'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
// import { syncHistoryWithStore } from '../../src'
import { syncHistoryWithStore } from 'react-router-redux'

import { configureStore } from './store'
import routes from './routes'
import facade from './domain/api/facade'
import * as actions from './action';


const PORT = 2000;
const app = express()

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: '/__build__/',
  stats: {
    colors: true
  }
}))

const HTML = ({ content, store }) => (
  <html>
    <head>
      <link rel='stylesheet' href='/__build__/app.css'/>
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: content }}/>
      <div id="devtools"/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src="/__build__/bundle.js"/>
    </body>
  </html>
)

app.get('*', function (req, res, next) {
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      // console.log( '--------------------' );
      // console.log( renderProps.location.pathname );
      // console.log( '--------------------' );

      facade( renderProps.location.pathname )
        .then( response =>{

          let data = response ? response : '';
          store.dispatch(actions.getApiDataSuccess(data));

          const content = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps}/>
            </Provider>
          )
          res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))

        }).catch(e =>{
          console.log(e);
        });
    }
  })
});


// app.use((req, res)=> {
//   const memoryHistory = createMemoryHistory(req.url)
//   const store = configureStore(memoryHistory)
//   const history = syncHistoryWithStore(memoryHistory, store)
//
//   match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
//     if (error) {
//       res.status(500).send(error.message)
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//     } else if (renderProps) {
//
//       // console.log( '--------------------' );
//       // console.log( renderProps );
//       // console.log( '--------------------' );
//
//       const content = renderToString(
//         <Provider store={store}>
//           <RouterContext {...renderProps}/>
//         </Provider>
//       )
//
//       res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
//     }
//   })
// })

app.listen(PORT, ()=> {
  console.log(`Server listening on http://localhost:${PORT}, Ctrl+C to stop`)
})
