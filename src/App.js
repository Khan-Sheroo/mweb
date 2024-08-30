import React, {useState, useEffect} from 'react';


import CampaignSelector from './components/CampaignSelector';
import ProviderSelector from './components/ProviderSelector';
import PriceRangeFilter from './components/PriceRangeFilter';
import ProductList from './components/ProductList';


import './App.css';

const BASEURL = "https://apigw.mweb.co.za/prod/baas/proxy";
const campaignsURL = `${BASEURL}/marketing/campaigns/fibre?channels=120&visibility=public`;
/*const staticProviders = {all: ["OpenServe","Balwin","Web Connect","TT Connect","Thinkspeed","MFN NOVA","Octotel","Vodacom","Lightstruck","MFN","Frogfoot Air","ClearAccess","Vumatel","Zoomfibre","FrogFoot","Evotel"
], prepaidFibre: ['Vuma Reach']
};*/

const getSummarizedProduct = ({ productCode, productName, productRate, subcategory }) => {
  const provider = subcategory.replace('Uncapped', '').replace('Capped', '').trim();
  return {productCode, productName, productRate, provider}
};



function App() {
  const [selectedCampaignCode, setSelectedCampaignCode] = useState(null);
  const [selectedProviders, setSelectedProviders] =useState([]); 
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [providers] = useState( ["OpenServe", "Balwin", "Web Connect", "TT Connect", "Thinkspeed", "MFN NOVA",
     "Octotel", "Vodacom", "Lightstruck", "MFN", "Frogfoot Air", "ClearAccess", "Vumatel", "ZoomFibre", "Frogfoot", "Evotel"]);
  const [campaigns, setCampaigns] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    fetch(campaignsURL)
      .then(response => response.json())
      .then(data => {
        setCampaigns(data.campaigns || []);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() =>{
    if (selectedCampaignCode) {   
      const selectedCampaign = campaigns.filter(c => c.code === selectedCampaignCode)[0];
      if (selectedCampaign) {
        const promoCodes = selectedCampaign.promoCodes || [];
    
        if (promoCodes.length > 0) {
          const promoCodesString = promoCodes.join(',');
          const promocodeProductsURL = `${BASEURL}/marketing/products/promos/${promoCodesString}?sellable_online=true`; //JOIN PROMO CODES, IF MULTIPLE OPTIONS ARE CHOSEN
          console.log('Fetching url:', promocodeProductsURL);

          fetch(promocodeProductsURL)
            .then(response => response.json())
            .then(data => {
              console.log("API RESPONSE:", data);
              const products = data.products || [];
              setProducts(products.map(product => getSummarizedProduct(product))); //filter and summarize products
          })
          .catch(error => console.error('Error fetching products:', error));
        }
      }
    }
  },[selectedCampaignCode, campaigns]);

  //FILTER PRODUCTS ON PROVIDERS AND PRICE RANGE
  useEffect(() => {
    const filtered = products.filter(product => {
      const inProvider = selectedProviders.length === 0 || selectedProviders.includes(product.provider);
      const inPriceRange = selectedPriceRange.length === 0 || selectedPriceRange.some(range => {
        if (range === 'R0 - R669' && product.productRate <= 669) return true;
        if (range === 'R700 - R900' && product.productRate >= 700 && product.productRate <= 999) return true;
        if (range === 'R1000+' && product.productRate >= 1000) return true;
      return false;
      });

    return inProvider && inPriceRange
    });

    setFilteredProducts(filtered);
  }, [selectedProviders, selectedPriceRange, products]);

  const handleProviderChange = (updatedProviders) => {
    setSelectedProviders(updatedProviders);
  };

  const handleCampaignChange = (campaignCode) => {
    console.log('selected campaign:', campaignCode);
    setSelectedCampaignCode(campaignCode);
    
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Fibre Products</h1>
        <p>Select a fibre infrastructure provider below,browse the products available and complete a coverage search</p>
      </header>
      <CampaignSelector
        campaigns={campaigns}
        selectedCampaignCode = {selectedCampaignCode}
        setSelectedCampaignCode = {handleCampaignChange}
      />

      <ProviderSelector
        providers={providers}
        selectedProviders={selectedProviders}
        handleProviderChange={handleProviderChange}
      />

      <PriceRangeFilter
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
      />

      <ProductList products={filteredProducts}/>  
    </div>
  );
}



export default App;
