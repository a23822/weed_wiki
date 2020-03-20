import React from 'react';
import { Route } from 'react-router-dom';
import Main from './components/main/main';
import Header from './components/header/header';
import Wiki from './components/wiki/wiki';
import Todo from './components/toto/todo';
import Uniform from './components/uniform/uniform';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';

function App() {
  return (
    <div className="weed_wiki">
      <Header/>
      <Route path="/" component={Main} exact={true}/>
      <Route path="/wiki" component={Wiki} exact={true}/>
      <Route path="/todo" component={Todo} exact={true}/>
      <Route path="/uniform" component={Uniform} exact={true}/>
      <Route path="/signin" component={SignIn} exact={true}/>
      <Route path="/signup" component={SignUp} exact={true}/>
    </div>
  );
}

export default App;
