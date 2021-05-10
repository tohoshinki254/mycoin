import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppContext } from './contexts/AppContext';
import { PRIVATE_KEY, PUBLIC_KEY } from './global/constants';
import AccessPage from './pages/AccessPage';
import HomePage from './pages/HomePage';
import LatestBlocksPage from './pages/LatestBlocksPage';
import LatestTransactionsPage from './pages/LatestTransactionsPage';

function App() {
  const[isAccessed, setIsAccessedState] = useState(localStorage.getItem(PUBLIC_KEY) !== null);

  const setIsAccessed = (value) => {
    setIsAccessedState(value);
  }

  useEffect(() => {
    const handleRefresh = () => {
      if (localStorage.getItem(PUBLIC_KEY) !== null) {
        localStorage.removeItem(PUBLIC_KEY);
        localStorage.removeItem(PRIVATE_KEY);
      }
    }

    // window.addEventListener("beforeunload", (e) => {
    //   e.preventDefault();
    //   handleRefresh();
    // })
  }, []);

  return (
    <AppContext.Provider value={{ isAccessed: isAccessed, setIsAccessed: setIsAccessed }}>
      <Switch>
        <Route exact path='/'>
          <Redirect to="/wallet"/>
        </Route>
        <Route path="/wallet" component={AccessPage} />
        <Route path="/dashboard" component={HomePage} />
        <Route path="/blocks/:address" component={LatestBlocksPage} />
        <Route path="/transactions/:address" component={LatestTransactionsPage} />
      </Switch>
    </AppContext.Provider>
  );
}

export default App;
