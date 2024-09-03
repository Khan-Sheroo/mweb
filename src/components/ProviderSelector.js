import React from 'react';

/**
 * ProviderSelector component renders a list of checkboxes for selecting fibre providers.
 * 
 * @param {Array} providers - Array of provider names.
 * @param {Array} selectedProviders - Array of currently selected provider names.
 * @param {Function} handleProviderChange - Callback function to handle changes in selected providers.
 */
const ProviderSelector = ({ providers, selectedProviders, handleProviderChange }) => {
    /**
     * Handles checkbox change event.
     * 
     * @param {string} provider - The name of the provider that was toggled.
     */
    const handleCheckboxChange = (provider) => {
        const updatedProviders = selectedProviders.includes(provider)
            ? selectedProviders.filter(p => p !== provider)
            : [...selectedProviders, provider];

        handleProviderChange(updatedProviders);
    };
    
    return (
        <div>
            <h2>Select Fibre Providers</h2>
            <form className='provider-form'>
                {providers.map(provider => (
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