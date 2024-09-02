
import React from 'react';


const ProviderLogos = ({ providerInfo }) => {
  return (
    <div className="provider-logos">
      {providerInfo.map(provider => (
        <img
          key={provider.code}
          src={provider.url}
          alt={provider.name}
          className="provider-logo"
        />
      ))}
    </div>
  );
};

export default ProviderLogos;