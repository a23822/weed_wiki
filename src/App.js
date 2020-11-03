import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main/main';

function App() {
  return (
    <div className="weed_wiki">
      <Header/>
      <Switch>
        <Route exact path={["/", "/home"]} component={Main}/>
      </Switch>
    </div>
  );
}

export default App;
