import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {

  constructor() {
    super();

    this.hide = { opacity: 0};
    this.show = { opacity: 1 , transition: 'opacity 0.3s linear'};
  }

  render() {
    const { children } = this.props;

    return (
      <div className="app-container">
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
  }
}

// App.propTypes = {
//   store: React.PropTypes.object.isRequired
// };
//
// const mapStateToProps = state => ({store: state})
// const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)})
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)
