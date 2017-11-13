import React from 'react';
import { Provider } from 'react-redux';
import App from './App'
import { Route } from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'
export const history = createHistory();


const Root = ({ store }) => (
	<Provider store={store}>
	    <ConnectedRouter history={history}>
		    <div>
	        	<Route path="/:filter?" component={ App }/>
	        </div>
    	</ConnectedRouter>
	</Provider>
);

export default Root;