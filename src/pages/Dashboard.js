import React, { useState } from 'react';
import { Row, Typography, Spin, Input, Select  } from 'antd';

import NFTCard from '../components/NFTCard';
import { COVALENT_APIKEY } from '../config';

function Dashboard({ chains }) {
  const [type, setType] = useState("137");
  const [userNFTs, setUserNFTs] = useState([]);
  const [nftLoading, setNFTLoading] = useState(false);
  const [chainIconURL, setChainIconURL] = useState("");

  const loadMyCollection = async address => {
    try{
      setNFTLoading(true);
      const nft = await fetch(`https://api.covalenthq.com/v1/${type}/address/${address}/balances_v2/?nft=true&key=${COVALENT_APIKEY}`);
      const { data } = await nft.json();

      let nftData = [];
      data.items.forEach(item => {
        if(item.nft_data){
          item.nft_data.forEach(nft => {
            nft.contract_address = item.contract_address;
            nft.contract_name = item.contract_name;
            nft.contract_ticker_symbol = item.contract_ticker_symbol;
            nft.chain_id = data.chain_id;
          })
          nftData = nftData.concat(item.nft_data);
        }
      });

      setUserNFTs(nftData || []);
      setNFTLoading(false);
    } catch(error) {
      console.log(error);
      setNFTLoading(false);
    }
  }

  const changeType = value => {
    console.log(`selected ${value}`);
    setType(value);
  }

  const onSearch = value => {
    console.log(value);
    chains.forEach(c => {
      if(c.chain_id == type) setChainIconURL(c.logo_url);
    });
    
    loadMyCollection(value);
  }

  return (
    <div style={{ margin: "1rem 0" }}>
      <Select
        placeholder="Select a Network"
        optionFilterProp="children"
        onChange={changeType}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {chains.map(c => (
          <Select.Option key={c.chain_id} value={c.chain_id}>
            <img src={c.logo_url} className="chain-icon-sm"/>{c.label}
          </Select.Option>
        ))}
       
      </Select>
      <Input.Search placeholder="Find NFTs by address" onSearch={onSearch} style={{ maxWidth: '600px' }} enterButton/>
      <br />
      <br />
      {nftLoading
        ? <Spin className="spinner" size="large" />
        : <Row gutter={[16, 16]}>
            {userNFTs.length
              ? userNFTs.map((nft, index) => (
                  <NFTCard key={index} nftdata={nft} chainIconURL={chainIconURL} />
                ))
              : <Typography.Text type="danger" className="nonfts-message">No NFTs for this address</Typography.Text>
          }
          </Row>
      }
    </div>
  )
}

export default Dashboard;
