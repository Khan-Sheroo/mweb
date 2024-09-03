import React, { useState, useEffect } from 'react';

// Import components and assets
import CampaignSelector from './components/CampaignSelector';
import ProviderSelector from './components/ProviderSelector';
import PriceRangeFilter from './components/PriceRangeFilter';
import ProductList from './components/ProductList';
import providerInfo from './components/providerInfo';
import ProviderLogos from './components/ProviderLogos';
import mweb from './components/images/mweb.jpg';

import './App.css';

// Base URL for API requests
const BASEURL = "https://apigw.mweb.co.za/prod/baas/proxy/";
const campaignsURL = `${BASEURL}marketing/campaigns/fibre?channels=120&visibility=public`;

// Helper function to summarize product information
const getSummarizedProduct = ({ productCode, productName, productRate, subcategory, logo }) => {
  const provider = subcategory.replace('Uncapped', '').replace('Capped', '').trim();
  const providerLogo = providerInfo.find(p => p.name.toLowerCase() === provider.toLowerCase())?.url || 'src/fibre.jpg';
  console.log('Provider:', provider, 'Provider Logo:', providerLogo);
  return { productCode, productName, productRate, provider, providerLogo };
};

// Helper function to extract products from promo codes
const getProductsFromPromo = (pc) => {
  const promoCode = pc.promoCode;
  return pc.products.map(product => ({
    ...getSummarizedProduct(product),
    promoCode
  }));
};

function App() {
  // State variables
  const [selectedCampaignCode, setSelectedCampaignCode] = useState(null);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [providers, setProviders] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch campaigns on component mount
  useEffect(() => {
    fetch(campaignsURL)
      .then(response => response.json())
      .then(data => {
        const fetchedCampaigns = data.campaigns || [];
        setCampaigns(fetchedCampaigns);
        if (fetchedCampaigns.length > 0) {
          setSelectedCampaignCode(fetchedCampaigns[0].code);
        }
        console.log('Fetched data:', data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Fetch products based on selected campaign
  useEffect(() => {
    if (selectedCampaignCode) {
      const selectedCampaign = campaigns.find(c => c.code === selectedCampaignCode);
      if (selectedCampaign) {
        const promocodes = selectedCampaign.promocodes || [];
        console.log('Promo data:', promocodes);
        if (promocodes.length > 0) {
          const promcodeProductsURL = `${BASEURL}marketing/products/promos/${promocodes.join(',')}?sellable_online=true`; // JOIN PROMO CODES, IF MULTIPLE OPTIONS ARE CHOSEN
          console.log('Fetching URL:', promcodeProductsURL);

          fetch(promcodeProductsURL)
            .then(response => response.json())
            .then(promocodeProducts => {
              console.log("Promocode products:", promocodeProducts);

              const summarizedProducts = promocodeProducts.reduce((prods, pc) => [...prods, ...getProductsFromPromo(pc)], []);
              console.log('Summarized Products:', summarizedProducts);
              const providerList = [...new Set(summarizedProducts.map(p => p.provider))];
              console.log('Providers list:', providerList);
              setProviders(providerList);
              setProducts(summarizedProducts);
            })
            .catch(error => console.error('Error fetching products:', error));
        }
      }
    }
  }, [selectedCampaignCode, campaigns]);

  // Filter products based on selected providers and price range
  useEffect(() => {
    const filtered = products.filter(product => {
      const inProvider = selectedProviders.length === 0 || selectedProviders.includes(product.provider);
      const inPriceRange = selectedPriceRange.length === 0 || selectedPriceRange.some(range => {
        if (range === 'R0 - R669' && product.productRate <= 669) return true;
        if (range === 'R700 - R900' && product.productRate >= 700 && product.productRate <= 999) return true;
        if (range === 'R1000+' && product.productRate >= 1000) return true;
        return false;
      });
      return inProvider && inPriceRange;
    });

    setFilteredProducts(filtered);
  }, [selectedProviders, selectedPriceRange, products]);

  // Handlers for state changes
  const handleProviderChange = (providerCode) => {
    setSelectedProviders(providerCode);
  };

  const handleCampaignChange = (campaignCode) => {
    setSelectedCampaignCode(campaignCode);
    console.log('Selected campaign:', campaignCode);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src={mweb} alt='logo' style={{ height: 'auto', width: '120%' }} />
        </h1>
      </header>
      <ProviderLogos providerInfo={providerInfo} />

      <div className="selectors-container">
        <CampaignSelector
          campaigns={campaigns}
          selectedCampaignCode={selectedCampaignCode}
          setSelectedCampaignCode={handleCampaignChange}
        />

        <PriceRangeFilter
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
        />
      </div>

      <ProviderSelector
        providers={providers}
        selectedProviders={selectedProviders}
        handleProviderChange={handleProviderChange}
      />

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;
