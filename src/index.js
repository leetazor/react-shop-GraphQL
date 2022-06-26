import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';
import {UserProvider} from './contexts/user.context';
import {CategoriesProvider} from './contexts/categories.context';
import {CartProvider} from './contexts/cart.context';

import './index.scss';

import reportWebVitals from './reportWebVitals';

// InMemoryCache keeps a cached version of a previous request, so if the same request is made, the cached version is served 
const client = new ApolloClient({
  uri: 'https://crwn-clothing.com',
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter >    
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>    
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
