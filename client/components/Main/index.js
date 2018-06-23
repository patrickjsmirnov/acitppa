import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from '../Login';
import Countries from '../Countries';

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/countries' component={Countries}/>
      </Switch>
    </main>
  )

export default Main;
