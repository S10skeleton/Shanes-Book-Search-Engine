import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';


import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: 'https://book-search-engine-yvby.onrender.com/graphql', // Replace with your GraphQL server URI
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
