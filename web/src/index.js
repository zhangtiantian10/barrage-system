import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router'
import {AppContainer} from 'react-hot-loader'
import createBrowserHistory from 'history/createBrowserHistory'
import {Provider} from 'react-redux'
import configureStore from './store'
import App from './App';
import Login from './User/Login'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore()
const history = createBrowserHistory()

ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<Router history={history}>
				<div>
					<Route path="/login" component={Login} />
					<Route exact path="/" component={App}/>
				</div>
			</Router>
		</AppContainer>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
	module.hot.accept();
	module.hot.dispose((data) => {
		data.store = store;
	});
}
