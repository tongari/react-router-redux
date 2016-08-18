import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import facade from '../domain/api/facade'
import * as actions from '../action';

export default class Hoge extends React.Component {

  componentDidMount(){
    console.log('componentDidMount');
  }

  render() {

    const { store, actions } = this.props;

    if(!store.apiData){
      facade( store.routing.locationBeforeTransitions.pathname )
        .then( response =>{

          let data = response ? response : '';
          setTimeout(()=> {actions.getApiDataSuccess(data)},500);

        }).catch(e =>{
        console.log(e);
      });
    }

    const hide = {
      display: 'none'
    }
    const show = {
      display: 'block'
    }

    return (
      <div style={store.apiData ? show : hide}>
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
