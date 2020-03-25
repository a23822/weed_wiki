import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main/main';
import Header from './components/header/header';
import Wiki from './components/wiki/wiki';
import Todo from './components/toto/todo';
import Uniform from './components/uniform/uniform';

function App() {
  return (
    <div className="weed_wiki">
      <Header/>
      <Switch>
        <Route exact path={["/", "/home"]} component={Main}/>
        <Route exact path="/wiki" component={Wiki}/>
        <Route exact path="/todo" component={Todo}/>
        <Route exact path="/uniform" component={Uniform}/>
      </Switch>
    </div>
  );
}

export default App;
