import React from 'react';

const ProviderSelector = ({providers, selectedProviders, handleProviderChange }) => {
    const handleCheckboxChange = (provider) => {
        const updatedProviders= selectedProviders.includes(provider)
            ? selectedProviders.filter(p => p !== provider)
            :[...selectedProviders, provider];

        handleProviderChange(updatedProviders);
    };
    
        return (
            
            <div>
                <h2>Select Fibre Providers</h2>
                <form className='provider-form'>
                    {providers.map(provider =>(
                        <div key={provider} className='provider-checkbox'>
                            <input
                                type="checkbox"
                                id={provider}
                                value={provider}
                                checked={selectedProviders.includes(provider)}
                                onChange={() => handleCheckboxChange(provider)}
                            />
                            <label htmlFor={provider}>{provider}</label>
                        </div>
                    ))}
                </form>
            </div>
        );
    };

    export default ProviderSelector;