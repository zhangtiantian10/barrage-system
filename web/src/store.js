import { createStore } from 'redux';
import reducer from './reducer';

let storeInstance

export default function configureStore(initialState) {
	storeInstance = storeInstance || createStore(reducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		initialState
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