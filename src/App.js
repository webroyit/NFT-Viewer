import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { COVALENT_APIKEY } from './config';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  const [chains, setChains] = useState([]);

  useEffect(() => {
    loadAllChains();
  }, [])
  
  const loadAllChains = async () => {
    try{
      const chains = await fetch(`https://api.covalenthq.com/v1/chains/?quote-currency=USD&format=JSON&key=${COVALENT_APIKEY}`);
      const { data } = await chains.json();
      setChains(data.items);
    } catch(error) {
      console.log(error);
    }
  }
  return (
    <HashRouter>
      <Layout className="layout">
        <Navbar />
        <Layout.Content style={{ padding: '0 55px', minHeight: '100vh' }}>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard chains={chains}/>} />
          </Routes>
        </Layout.Content>
      </Layout>
    </HashRouter>
  );
}

export default App;
