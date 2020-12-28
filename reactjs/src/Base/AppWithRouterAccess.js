import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import SignInSide from '../User/SignInSide';
import SignUp from '../User/SignUp';
import Template from './Template';
//import Profile from './User/Profile';
import oktaConfig from '../User/okta.config';
import Notfound from '../Common/NotFound';

import Customers from '../Customers';
import Interests from '../Interests';
import Customer from '../Customer';
import Profile from '../User/Profile';
import Items from '../Items';
import Bookings from '../Bookings';
import Analytics from '../Analytics'
import Dashboard from './Dashboard';
import Interest from '../Interest';
import CustomerInterest from '../CustomerInterest';
import CustomerBooking from '../CustomerBooking';
import CustomerPayment from '../CustomerPayment';
import Public from './Public';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  return (
    <Security issuer={oktaConfig.issuer}
              clientId={oktaConfig.clientId}
              redirectUri={oktaConfig.redirectUri}
              onAuthRequired={onAuthRequired}
              pkce={true} >
      <Switch>
        <Route path='/login' render={() => <SignInSide baseUrl={oktaConfig.url} />} />
        <Route path='/signup' render={() => <SignUp baseUrl={oktaConfig.url} />} />
        <Route path='/implicit/callback' component={LoginCallback} />
        <SecureRoute path='/' exact={true} render={() => <Template content=<Dashboard/> />} />
        <SecureRoute path='/profile' render={() => <Template content=<Profile/> />} />
        <SecureRoute path='/items' render={() => <Template content=<Items/> />} />
        <SecureRoute path='/bookings' render={() => <Template content=<Bookings/> />} />
        <SecureRoute path='/customers' render={() => <Template content=<Customers/> />} />
        <SecureRoute path='/customer' render={() => <Template content=<Customer/> />} />
        <SecureRoute path='/analytics' render={() => <Template content=<Analytics/> />} />
        <SecureRoute path='/interests' render={() => <Template content=<Interests/> />} />
        <Route path='/publicinterest' render={() => <Public content=<Interest/> />} />
        <SecureRoute path='/customerinterest' render={() => <Template content=<CustomerInterest/> />} />
        <SecureRoute path='/interest' render={() => <Template content=<Interest/> />} />
        <SecureRoute path='/customerbooking' render={() => <Template content=<CustomerBooking/> />} />
        <SecureRoute path='/customerpayment' render={() => <Template content=<CustomerPayment/> />} />
        <Route component={Notfound} />
      </Switch>
    </Security>
  );
};
export default AppWithRouterAccess;
