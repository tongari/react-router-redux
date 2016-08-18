import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import facade from '../domain/api/facade'
import * as actions from '../action';

export default class Common extends React.Component {

  constructor() {
    super()

    this.hide = { opacity: 0}
    this.show = { opacity: 1 , transition: 'opacity 0.3s linear'}
  }

  componentDidMount(){
    //console.log('componentDidMount');
  }

  render() {

    const { store, actions } = this.props;

    if(!store.apiData){
      facade( store.routing.locationBeforeTransitions.pathname )
        .then( response =>{

          let data = response ? response : '';
          actions.getApiDataSuccess(data);

        }).catch(e =>{
        console.log(e);
      });
    }
  }
}

// const mapStateToProps = state => ({store: state})
// const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)})
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Common)
