import React from 'react';
import Home from './components/Home/Home';
import InsertData from './components/InsertData/InsertData';
import CompareNumberOfDrones from './components/CompareNumberOfDrones/CompareNumberOfDrones';
import Results from './components/Results/Results';
import { HashRouter as Router, Routes , Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Configuration } from './Configuration';
import './App.css';

const queryClient = new QueryClient(); /* Create a query client for use in react-query library */

/* App component */
function App() {

    Configuration.load(); /* load the configuration file */
    
    return (
        <QueryClientProvider client={queryClient}> {/* Provide the query client to the react-query library */}
            <div id="App" className='backgroundimg'> 
                <Router> {/* Define the router for the application */}
                    <Routes> {/* Define the routes- the paths and the url for the application */}
                        <Route path="/" element={<Home />}/>
                        <Route path="/insertData" element={<InsertData />}/>
                        <Route path='/compareNumberOfDrones' element={<CompareNumberOfDrones />}/>
                        <Route path='/results' element={<Results />}/>
                    </Routes> 
                </Router>  
            </div>
        </QueryClientProvider>
    );
}

export default App; /* export App component */
