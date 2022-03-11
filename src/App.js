import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalContextProvider } from './context/globalState';
import Cards from './components/Cards/Cards';
const App = () => {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Router>
            <Routes>
              <Route path="/" exact element={<Cards />} />
            </Routes>
        </Router>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
