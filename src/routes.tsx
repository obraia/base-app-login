import React from 'react';
import { Route, Redirect, Switch } from "react-router-native";
import { useSelector, useDispatch } from 'react-redux';

import { IReducers } from './interfaces';

import Auth from './pages/auth';
import Home from './pages/home';
import Import from './pages/importProducts';
import Export from './pages/exportProducts';
import Search from './pages/searchProduct';
import Product from './pages/product';

const Routes = () => {

  const { isAuthenticated } = useSelector((state: IReducers) => state.authReducers);

  return (
    <Switch>
      {!isAuthenticated ?
        <>
          <Route exact path='/' component={Auth} />
        </>
        :
        <>
          <Redirect exact path='/' from='/' to='/home'/>
          <Route exact path='/home' component={Home} />
          <Route exact path='/import' component={Import} />
          <Route exact path='/export' component={Export} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/product/:index/:previous?' component={Product} />
        </>}
    </Switch>
  )
}

export default Routes