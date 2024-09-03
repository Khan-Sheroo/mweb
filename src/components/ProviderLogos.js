import React from 'react';

/**
 * ProviderLogos component renders a list of provider logos.
 * 
 * @param {Array} providerInfo - Array of provider objects, each with a code, name, and URL.
 */
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

export default ProviderLogos;