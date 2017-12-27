import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer';

let storeInstance

export default function configureStore(initialState) {
	storeInstance = storeInstance || createStore(reducer,
		initialState,
		applyMiddleware(thunkMiddleware)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducer', () => {
			// const nextRootReducer = require('./reducer');
			storeInstance.replaceReducer(reducer);
		});
	}

	return storeInstance;
}