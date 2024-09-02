import React from 'react';

const CampaignSelector =({ campaigns, selectedCampaignCode, setSelectedCampaignCode}) => {
    const handleCampaignChange = (e) => {
        setSelectedCampaignCode(e.target.value);
    };
    
    return (
        <div>
            <select value={selectedCampaignCode} onChange={handleCampaignChange} className='campaign-select'>
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