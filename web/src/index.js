import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router'
import {AppContainer} from 'react-hot-loader'
import createBrowserHistory from 'history/createBrowserHistory'
import {Provider} from 'react-redux'
import configureStore from './store'
import HomePage from './HomePage';
import Login from './User/LoginRegister'
import Barrage from './Barrage'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore()
const history = createBrowserHistory()

ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<Router history={history}>
				<div>
					<Route path="/login" component={Login} />
					<Route exact path="/" component={HomePage}/>
					<Route path="/register" component={Login}/>
					<Route path="/barrage" component={Barrage}/>
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
