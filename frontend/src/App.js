import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppContext } from './contexts/AppContext';
import AccessPage from './pages/AccessPage';

function App() {
  return (
    <AppContext.Provider value={{ isAccessed: false }}>
      <Switch>
        <Route exact path='/'>
          <Redirect to="/access-my-wallet"/>
        </Route>
        <Route path="/access-my-wallet" component={AccessPage} />
      </Switch>
    </AppContext.Provider>
  );
}

export default App;
