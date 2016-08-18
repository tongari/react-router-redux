// import 'babel-polyfill';
// import {get} from '../utils/externalData';
// import {wait} from '../utils/wait';
import fetch from 'isomorphic-fetch';

const searchWord = 'zedd';
const url = `https://dry-plains-46710.herokuapp.com/index.php?sw=${searchWord}`;

const hoge = () => {

  return new Promise( (resolve,reject) => {

    fetch(url)
      .then(response => {
          return response.json();
        }).then( res => {
        resolve(res)
      }).catch((ex)=>{
        reject(ex);
      });
  });

};

export default hoge;
