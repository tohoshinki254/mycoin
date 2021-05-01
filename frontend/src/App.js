import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppContext } from './contexts/AppContext';
import AccessPage from './pages/AccessPage';
import HomePage from './pages/HomePage';
import LatestBlocksPage from './pages/LatestBlocksPage';
import LatestTransactionsPage from './pages/LatestTransactionsPage';

function App() {
  return (
    <AppContext.Provider value={{ isAccessed: false }}>
      <Switch>
        <Route exact path='/'>
          <Redirect to="/wallet"/>
        </Route>
        <Route path="/wallet" component={AccessPage} />
        <Route path="/dashboard" component={HomePage} />
        <Route path="/blocks" component={LatestBlocksPage} />
        <Route path="/transactions" component={LatestTransactionsPage} />
      </Switch>
    </AppContext.Provider>
  );
}

export default App;
