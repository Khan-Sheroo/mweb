import React from 'react';

/**
 * CampaignSelector component renders a dropdown menu for selecting a campaign.
 * 
 * @param {Array} campaigns - Array of campaign objects.
 * @param {string} selectedCampaignCode - Currently selected campaign code.
 * @param {function} setSelectedCampaignCode - Function to update the selected campaign code.
 */
const CampaignSelector = ({ campaigns, selectedCampaignCode, setSelectedCampaignCode }) => {
  
  // Handle change in campaign selection
  const handleCampaignChange = (e) => {
    setSelectedCampaignCode(e.target.value);
  };

  return (
    <div>
      <select 
        value={selectedCampaignCode} 
        onChange={handleCampaignChange} 
        className='campaign-select'
      >
        <option value=''>Select a campaign</option>
        {campaigns.map(campaign => (
          <option key={campaign.code} value={campaign.code}>
            {campaign.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CampaignSelector;