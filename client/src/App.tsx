import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from "react-redux";

import store from "./store/store";

import Layout from "./components/Layout/Layout";

import './App.css';

function App() {

    const queryClient = new QueryClient();

  return (
    <>
        <Provider store={store} >
            <QueryClientProvider client={queryClient} >
                <Layout />
            </QueryClientProvider>
        </Provider>
    </>
  );
}

export default App;
