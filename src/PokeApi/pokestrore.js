import rootReducer from './reducers/rootReducer'
import {createStore} from 'redux'

const pokestore = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  export default pokestore