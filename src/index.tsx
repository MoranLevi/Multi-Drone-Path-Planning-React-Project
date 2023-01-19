import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ELogLevel, ILoggerConfiguration, LoggerFactory } from './logger';
import './index.css';

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
        loggerName: 'app',
        loggerLevel: ELogLevel.DEBUG
    },
]

// Then, this JSON should be an external file on the backend, for the frontend to fetch on backend connection
// const backendConfig: ILoggerConfiguration[] = []
// LoggerFactory.updateConfiguration(backendConfig)

// Finally, on each localStorage user update - we update the logger config again


LoggerFactory.init(DEFAULT_CONFIG); /* Init the logger with the default config */


ReactDOM.render(
    <Provider store={store}> {/* Provide the store to the redux library */}
        <React.StrictMode> {/* Strict mode is a tool for highlighting potential problems in an application. */}
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
