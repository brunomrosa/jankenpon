import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import Game from '../pages/Game';
import Singleplayer from '../pages/Singleplayer';
import Multiplayer from '../pages/Multiplayer';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Game} />
    <Route path="/singleplayer" exact component={Singleplayer} />

    <Route path="/multiplayer" component={Multiplayer} />

  </Switch>
);

export default Routes;
