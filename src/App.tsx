import './App.css';
import { useAppSelector } from './redux/hooks';
import { CounterActions } from './redux/actions/CounterActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
    const dispatch = useDispatch();

    const { count } = useAppSelector((state) => state.counter);

    useEffect(() => {
        // const fileAppender = new ConsoleAppender();
        // fileAppender.setLayout(new SimpleLayout());

        // const logger1 = getLogger('redux');
        // logger1.addAppender(fileAppender);

        // const logger2 = getLogger('redux.actions');

        // setTimeout(() => {
        //     logger2.debug('Hey');
        // }, 1000);

        // logger.info('hey')
        // const localStorageLogger1 = createLogg({
        //   logName: 'utils',
        //   maxLogSizeInBytes: 500 * 1024 // 500KB
        // });

        // const localStorageLogger2 = createLogg({
        //   logName: 'home-page',
        //   maxLogSizeInBytes: 500 * 1024 // 500KB
        // });

        // // Log something
        // // debug | info | warn | error
        // localStorageLogger1.info('something');
        // localStorageLogger1.debug({ foo: 'bar' });

        // localStorageLogger2.info('initializeee');
        // localStorageLogger2.error({ isActive: true });

        // // Export the log entries
        // const logEntries = localStorageLogger1.exportToArray();
        // console.warn();

        // console.log(JSON.parse(localStorage.getItem('my-app-log-name') || ''));
    }, []);

    return (
        <div id="App">
            <section id="info-section">
                <header>
                    A simple Website application build with {<br />}
                </header>
                <p id="info">
                    <label>React</label>
                    <label>JavaScript library for building user interfaces</label>

                    <label>Redux</label>
                    <label>Predictable State Container for JS Apps</label>

                    <label>Typescript</label>
                    <label>JavaScript with syntax for types</label>

                    <label>Debug</label>
                    <label>Debugging utility modelled after Node.js core's debugging technique</label>

                    <label>Redux-logger</label>
                    <label>Redux middleware to pipe action to primary logger</label>

                    <label>Responsive design</label>
                    <label>Web development approach that creates dynamic changes to the appearance of a website</label>
                </p>
            </section>
            <section id="counter-section">
                <h1>Count: {count}</h1>
                <div className="counter-buttons-container">
                <button
                        onClick={() => dispatch(CounterActions.decreaseCounter())}
                    >
                        Decrease Count
                    </button>
                    <button
                        onClick={() => dispatch(CounterActions.increaseCounter())}
                    >
                        Increase Count
                    </button>
                </div>
            </section>
            <div className="react-logo-container">
                <img
                    className="react-logo"
                    src="react-logo.svg"
                    alt="React logo"
                />
            </div>
        </div>
    );
}

export default App;
