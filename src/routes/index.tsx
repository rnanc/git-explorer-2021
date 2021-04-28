import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Favoritos from '../pages/Favoritos';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/:login+/starred" component={Favoritos} />
    <Route path="/:user+" component={Profile} />
  </Switch>
);

export default Routes;
