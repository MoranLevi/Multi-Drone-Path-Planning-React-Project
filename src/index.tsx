import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ELogLevel, ILoggerConfiguration, LoggerFactory } from './logger';


// First, this config will be the default one, util we fetch our one from backend
const DEFAULT_CONFIG: ILoggerConfiguration[] = [
    {
        loggerName: 'components',
        loggerLevel: ELogLevel.DEBUG
    },
    {
        loggerName: 'reducers',
        loggerLevel: ELogLevel.TRACE
    },
    {
        loggerName: 'CounterActions',
        loggerLevel: ELogLevel.DEBUG
    },
    {
        loggerName: 'app',
        loggerLevel: ELogLevel.DEBUG
    },
]

// Then, this JSON should be an external file on the backend, for the frontend to fetch on backend connection
// const backendConfig: ILoggerConfiguration[] = []
// LoggerFactory.updateConfiguration(backendConfig)

// Finally, on each localStorage user update - we update the logger config again


LoggerFactory.init(DEFAULT_CONFIG);


ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
