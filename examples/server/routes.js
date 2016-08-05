import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'
import Hoge from './containers/Hoge';


const App = ({ children }) => (
  <div>
    <header>
      Links:
      {' '}
      <Link to="/">Home</Link>
      {' '}
      <Link to="/foo">Foo</Link>
      {' '}
      <Link to="/bar">Bar</Link>
      {' '}
      <Link to="/hoge">Hoge</Link>
    </header>
    {children}
  </div>
)

const Home = () => (<div>Home!</div>)
const Foo = () => (<div>Foo!</div>)
const Bar = () => (<div>Bar!</div>)

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="foo" component={Foo}/>
    <Route path="bar" component={Bar}/>
    <Route path="hoge" component={Hoge}/>
  </Route>
)

export default routes
