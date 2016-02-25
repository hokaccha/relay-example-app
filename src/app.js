import App from './components/app';
import AppRoute from './routes/app';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

let app = React.createElement(Relay.RootContainer, {
  Component: App,
  route: new AppRoute(),
});
ReactDOM.render(app, document.getElementById('app'));
