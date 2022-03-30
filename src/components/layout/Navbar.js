import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

function Navbar() {
  return (
    <Layout.Header className="primary-bg-color" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" className="logo secondary-color" style={{ flex: 2 }}>
        NFT Viewer
      </Link>
    </Layout.Header>
  )
}

export default Navbar;
