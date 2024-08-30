import React from 'react';

const CampaignSelector =({ campaigns, selectedCampaignCode, setSelectedCampaignCode}) => {
    return (
        <div>
            <h2>Select Fibre Campaign</h2>
            <form>
                {campaigns.map(campaign => (
                    <div key={campaign.code}>
                        <input
                            type="radio"
                            id={campaign.code}
                            name="campaign"
                            value={campaign.code}
                            checked={selectedCampaignCode === campaign.code}
                            onChange={() => setSelectedCampaignCode(campaign.code)}
                        />
                        <label htmlFor={campaign.code}>{campaign.name}</label>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default CampaignSelector;