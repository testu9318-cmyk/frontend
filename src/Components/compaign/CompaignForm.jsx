import React from 'react'
import { useWithCount } from "../../hooks/useCompaign";
import { useTemplates } from '../../hooks/useTemplates';
function CompaignForm({setCampaignStep,newCampaign,setNewCampaign}) {


const { data: withCount, isLoading: loadingWithCount } = useWithCount();
  const { data: templatesData } = useTemplates();

console.log('templatesData', templatesData)
    const templates = [
    { id: 1, name: 'Welcome Email', category: 'Onboarding' },
    { id: 2, name: 'Newsletter Template', category: 'Newsletter' },
    { id: 3, name: 'Product Update', category: 'Promotional' }
  ];

  const segments = [
    { id: 1, name: 'All Users', count: 12547 },
    { id: 2, name: 'Premium Users', count: 3421 },
    { id: 3, name: 'Trial Users', count: 1876 },
    { id: 4, name: 'Inactive Users', count: 5234 }
  ];
  return (
    <div>
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Campaign Details</h2>
      <p className="text-gray-600 mb-8">Fill in the information for your campaign</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
            placeholder="e.g., Black Friday Sale 2024"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Subject Line <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={newCampaign.subject}
            onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
            placeholder="Enter subject line with {{variables}}"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Use variables like {'{{firstName}}'}, {'{{company}}'}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Template <span className="text-red-500">*</span>
          </label>
          <select
            value={newCampaign.templateId}
            onChange={(e) => setNewCampaign({...newCampaign, templateId: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a template...</option>
            {templatesData?.map(template => (
              <option key={template._id} value={template._id}>
                {template.name} ({template.category})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Recipients <span className="text-red-500">*</span>
          </label>
          <select
            value={newCampaign.recipientSegmentId}
            onChange={(e) => setNewCampaign({...newCampaign, recipientSegmentId: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose recipient segment...</option>
            {withCount?.data?.map(segment => (
              <option key={segment._id} value={segment._id}>
                {segment.name} ({segment.userCount.toLocaleString()} users)
              </option>
            ))}
          </select>
        </div>

        {newCampaign.type === 'recurring' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recurrence Pattern
            </label>
            <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={() => setCampaignStep(1)}
          className="px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold"
        >
          Back
        </button>
        <button
          onClick={() => setCampaignStep(3)}
          disabled={!newCampaign.name || !newCampaign.subject || !newCampaign.templateId || !newCampaign.recipientSegmentId}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue to Schedule
        </button>
      </div>
    </div>
  </div>
  )
}

export default CompaignForm