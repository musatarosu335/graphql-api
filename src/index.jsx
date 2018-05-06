import React from 'react';
import ReactDom from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';

// HttpLinkインスタンスを生成
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// ApolloClientインスタンスを生成
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// ApolloProviderでラップ
const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDom.render(
  <ApolloApp />,
  document.getElementById('root'),
);
