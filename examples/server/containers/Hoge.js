import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Hoge extends React.Component {

  render() {
    const { store } = this.props;

    return (
      <div>
        <p>hogehoge</p>
        <p>{store.routing.locationBeforeTransitions.pathname}</p>
        <Link to="/">toTop</Link>
      </div>
    )
  }
}

Hoge.propTypes = {
  store: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({store: state})
export default connect(
  mapStateToProps
)(Hoge)
