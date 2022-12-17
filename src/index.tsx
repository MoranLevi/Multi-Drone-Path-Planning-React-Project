import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './colors.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ELogLevel, ILoggerConfiguration, LoggerFactory } from './logger';
import { AppPackageName } from './constants/AppPackageName';
import { Configuration } from './constants/Configuration';


// First, this config will be the default one, util we fetch our one from backend
const DEFAULT_CONFIG: ILoggerConfiguration[] = [
    {
        loggerName: AppPackageName.APP,
        loggerLevel: ELogLevel.DEBUG
    },
    {
        loggerName: AppPackageName.SRC.LOGGER,
        loggerLevel: ELogLevel.TRACE
    },
    {
        loggerName: AppPackageName.SRC.REDUX.ACTIONS.TODO,
        loggerLevel: ELogLevel.DEBUG
    },
    {
        loggerName: AppPackageName.SRC.REDUX.REDUCERS,
        loggerLevel: ELogLevel.DEBUG
    },
]

// Then, this JSON should be an external file on the backend, for the frontend to fetch on backend connection
// const backendConfig: ILoggerConfiguration[] = []
// LoggerFactory.updateConfiguration(backendConfig)

// Finally, on each localStorage user update - we update the logger config again

Configuration.load();
LoggerFactory.init(DEFAULT_CONFIG);


ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
