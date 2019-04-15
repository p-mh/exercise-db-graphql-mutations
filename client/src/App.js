import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { client } from './services/client';

import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route path="/users" component={Users} />
          <Route path="/products" component={Products} />
          <Route path="/orders" component={Orders} />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
