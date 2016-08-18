import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import facade from '../domain/api/facade'
import * as actions from '../action';
import Common from './Common';

export default class Hoge extends Common {

  constructor() {
    super();
  }

  render() {
    super.render();
    const { store } = this.props;

    return (

      <div style={store.apiData ? this.show : this.hide}>
        <p>hogehoge</p>
        <p>{store.routing.locationBeforeTransitions.pathname}</p>
        <p>{store.apiData.regionCode}</p>
        <Link to="/">toTop</Link>
      </div>
    )

  }
}

Hoge.propTypes = {
  store: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({store: state})
const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hoge)
