import { HashRouter as Router, Routes , Route } from 'react-router-dom';
import React from 'react';
import background from "./images/background.jpeg";
import Home from './components/Home/Home';
import InsertData from './components/InsertData/InsertData';
import CompareNumberOfDrones from './components/CompareNumberOfDrones/CompareNumberOfDrones';
import Results from './components/Results/Results';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Configuration } from './Configuration';
import './App.css';

const queryClient = new QueryClient();

function App() {

    Configuration.load();
    
    return (
        <QueryClientProvider client={queryClient}>
            <div id="App" style={{
                backgroundImage:`url(${background})`,
                minHeight: "100vh",
                backgroundSize: "cover"
                }}>
            
                <Router>
                    <Routes>
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

export default App;
