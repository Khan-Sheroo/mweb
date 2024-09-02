import React, {useState, useEffect} from 'react';


import CampaignSelector from './components/CampaignSelector';
import ProviderSelector from './components/ProviderSelector';
import PriceRangeFilter from './components/PriceRangeFilter';
import ProductList from './components/ProductList';


import './App.css';

const BASEURL = "https://apigw.mweb.co.za/prod/baas/proxy/";
const campaignsURL = `${BASEURL}marketing/campaigns/fibre?channels=120&visibility=public`;
// const staticProviders = {all: ["OpenServe","Balwin","Web Connect","TT Connect","Thinkspeed","MFN NOVA","Octotel","Vodacom","Lightstruck","MFN","Frogfoot Air","ClearAccess","Vumatel","Zoomfibre","FrogFoot","Evotel"
// ], prepaidFibre: ['Vuma Reach']
// };



const getSummarizedProduct = ({productCode, productName, productRate, subcategory}) => {
  const provider = subcategory.replace('Uncapped', '').replace('Capped', '').trim();
  return {productCode, productName, productRate, provider};
};

const getProductsFromPromo = (pc) => {
  const promoCode = pc.promoCode;
  return pc.products.map(product => ({
    ...getSummarizedProduct(product),promoCode
  }));
}








function App() {
  const [selectedCampaignCode, setSelectedCampaignCode] = useState(null);
  const [selectedProviders, setSelectedProviders] =useState([]); 
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [providers, setProviders] = useState( []);
  const [campaigns, setCampaigns] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);




  useEffect(() => {
    fetch(campaignsURL)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setCampaigns(data.campaigns || []);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() =>{
    if (selectedCampaignCode) {   
      
      const selectedCampaign = campaigns.filter(c => c.code === selectedCampaignCode)[0];
      if (selectedCampaign) {
        const promocodes = selectedCampaign.promocodes || [];
        console.log('promo data:', promocodes);
        if (promocodes.length > 0) {
          const promcodeProductsURL = `${BASEURL}marketing/products/promos/${promocodes.join(',')}?sellable_online=true`; //JOIN PROMO CODES, IF MULTIPLE OPTIONS ARE CHOSEN
          console.log('Fetching url:', promcodeProductsURL);

          fetch(promcodeProductsURL)
            .then(response => response.json())
            .then(promocodeProducts => {
              console.log("Promocode products:", promocodeProducts);


              const summarizedProducts = promocodeProducts.reduce((prods, pc) => [...prods, ...getProductsFromPromo(pc)], []);
              console.log('Summarized Products:', summarizedProducts);
              const providerList = [...new Set(summarizedProducts.map(p => p.provider))];
              console.log('providers list:', providerList);
              setProviders(providerList);
              setProducts(summarizedProducts);
              
              
              
              
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
    
    setSelectedCampaignCode(campaignCode);
    console.log('selected campaign:', campaignCode);
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
      {/* <pre>{JSON.stringify(providers, null, 2)}</pre>   */}
    </div>
  );
}



export default App;