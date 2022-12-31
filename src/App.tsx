import './App.css';
import { useAppSelector } from './redux/hooks';
import { HashRouter as Router, Routes , Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import React from 'react';
import background from "./images/background.jpeg";
import Home from './components/Home/Home';
import InsertData from './components/InsertData/InsertData';

function App() {
    const dispatch = useDispatch();

    // const { count } = useAppSelector((state) => state.counter);

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
        <div id="App" style={{
            backgroundImage:`url(${background})`,
            minHeight: "100vh",
            backgroundSize: "cover"
            }}>
            
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/insertData" element={<InsertData />}/>
                    {/* <Route path='/compareDrones' element={<CompareDrones />}/> */}
                </Routes> 
            </Router>  
        </div>
    );
}

export default App;
