import React, { Component, PropTypes } from "react";
import Header from './components/header/Header';
import Route from './components/route/Route';
import LoggedIn from './components/loggedin/LoggedIn';
import GeoLocation from './components/geolocation/GeoLocation';
import VehicleSocket from "./components/vehicles/VehicleSocket";
import MapWrap from "./components/mapwrap/MapWrap";
import Users from "./components/users/Users";
import CurrentUser from "./components/users/CurrentUser";
import Vehicles from "./components/vehicles/Vehicles";
import Products from "./components/products/Products";
import Shops from "./components/shops/Shops";

import config from './config';
const app = config.app;
const routes = app.routes;

export default class Main extends Component {

  render() {
    return (
      <div>
        <Header title={app.name} routes={routes}/>

        <LoggedIn route={routes.Map}>

          <GeoLocation/>
          <CurrentUser/>

          <Route on={routes.Map}>
            <VehicleSocket/>
            <MapWrap/>
          </Route>

          <Route on={routes.Users}>
            <Users/>
          </Route>

          <Route on={routes.Vehicles}>
            <VehicleSocket/>
            <Vehicles/>
          </Route>

          <Route on={routes.Products}>
            <Products/>
          </Route>

          <Route on={routes.Shops}>
            <Shops/> 
          </Route>

        </LoggedIn>
      </div>
    )
  }
}
