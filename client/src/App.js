import React, { Component } from 'react';
import AppNavbar from './component/AppNavbar';
import ShoppingList from './component/ShoppingList';
import ItemModel from './component/itemModel';

import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadUser } from './actions/authAction';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <AppNavbar />
          <Container>
            <ItemModel />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
