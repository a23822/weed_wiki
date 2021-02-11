import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../main/main';
import Wiki from '../wiki/wiki';
import Todo from '../todo/todo';
import Uniform from '../uniform/uniform';
import Card from '../ncard/card';

const Body = () => {
    return(
        <div role="main" className="main_wrap">
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/wiki" component={Wiki}/>
                <Route exact path="/todo" component={Todo}/>
                <Route exact path="/uniform" component={Uniform}/>
                <Route exact path="/card" component={Card}/>
            </Switch>
        </div>
    )
}

export default Body;