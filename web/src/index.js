import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router'
import {AppContainer} from 'react-hot-loader'
import createBrowserHistory from 'history/createBrowserHistory'
import {Provider} from 'react-redux'
import configureStore from './store'
import UserPage from './User';
import Login from './LoginRegister'
import Barrage from './Barrage'
import AdminPage from './Admin'
import LiveData from "./Admin/UsersInfo/LiveData";
import registerServiceWorker from './registerServiceWorker';

const store = configureStore()
const history = createBrowserHistory()

ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<Router history={history}>
				<div>
					<Route path="/login" component={Login} />
					<Route path="/admin/login" component={Login} />
					<Route exact path="/user" component={UserPage}/>
					<Route exact path="/liveData" component={UserPage}/>
					<Route exact path="/createLive" component={UserPage}/>
					<Route exact path="/myLive" component={UserPage}/>
					<Route path="/register" component={Login}/>
					<Route path="/barrage" component={Barrage}/>
					<Route exact path="/admin/users" component={AdminPage}/>
					<Route exact path="/admin/password" component={AdminPage}/>
					<Route path="/liveRoom/:roomId" component={AdminPage}/>
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
