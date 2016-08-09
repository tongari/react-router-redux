import hoge from './hoge';

const routePath = {
  '/hoge': hoge
}

const facade = path => {

  return (routePath[path])? routePath[path]() : new Promise( resolve => resolve())
}

export default facade;
