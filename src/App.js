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
        <Route path="/" component={Main} exact={true}/>
        <Route path="/home" component={Main} exact={true}/>
        <Route path="/wiki" component={Wiki} exact={true}/>
        <Route path="/todo" component={Todo} exact={true}/>
        <Route path="/uniform" component={Uniform} exact={true}/>
      </Switch>
    </div>
  );
}

export default App;
