import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Favorites from '../pages/favorites'
import Home from '../pages/home'
import Gains from '../pages/gains'
import Historic from '../pages/historic'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/favorites" component={Favorites} />
    <Route path="/gains/:actionName+" component={Gains} />
    <Route path="/historic/:actionName+" component={Historic} />
  </Switch>
)

export default Routes
