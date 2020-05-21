import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main/main';
import Header from './components/header/header';
import Wiki from './components/wiki/wiki';
import Todo from './components/todo/todo';
import Uniform from './components/uniform/uniform';
import Admin from './components/admin/admin';
import Customer from './components/admin/customer';
import CharacterDB from './components/admin/character';

function App() {
  return (
    <div className="weed_wiki">
      <Header/>
      <Switch>
        <Route exact path={["/", "/home"]} component={Main}/>
        <Route exact path="/wiki" component={Wiki}/>
        <Route exact path="/todo" component={Todo}/>
        <Route exact path="/uniform" component={Uniform}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/admin/customer" component={Customer}/>
        <Route exact path="/admin/characterdb" component={CharacterDB}/>
      </Switch>
    </div>
  );
}

export default App;
