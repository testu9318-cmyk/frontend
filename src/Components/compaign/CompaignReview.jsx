import { CheckCircle, Clock, Send } from 'lucide-react'
import React from 'react'

const CompaignReview = ({setNewCampaign,newCampaign,setCampaignStep,setShowNewCampaign}) => {

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
     const selectedTemplate = templates.find(t => t.id == newCampaign.template);
    const selectedSegment = segments.find(s => s.id == newCampaign.recipients);

  const handleCreateCampaign = () => {
    console.log('Creating campaign:', newCampaign);
    setShowNewCampaign(false);
    setCampaignStep(1);
    setNewCampaign({
      type: 'one-time',
      name: '',
      subject: '',
      template: '',
      recipients: '',
      date: '',
      time: '',
      timezone: 'UTC'
    });
  };

  return (
    <div>
  

      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Review & Confirm</h2>
        <p className="text-gray-600 mb-8">Double-check your campaign details before scheduling</p>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg divide-y">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Campaign Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-gray-800 capitalize">{newCampaign.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-800">{newCampaign.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-semibold text-gray-800">{newCampaign.subject}</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Template & Recipients</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Template:</span>
                  <span className="font-semibold text-gray-800">{selectedTemplate?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipients:</span>
                  <span className="font-semibold text-gray-800">
                    {selectedSegment?.name} ({selectedSegment?.count.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Schedule</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-semibold text-gray-800">
                    {newCampaign.date} at {newCampaign.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timezone:</span>
                  <span className="font-semibold text-gray-800">{newCampaign.timezone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-green-900 text-sm mb-1">Ready to Schedule</h4>
                <p className="text-sm text-green-700">
                  Your campaign will be queued and sent automatically at the scheduled time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => setCampaignStep(3)}
            className="px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold"
          >
            Back
          </button>
          <button
            onClick={handleCreateCampaign}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Schedule Campaign
          </button>
        </div>
      </div>
</div>
  )
}

export default CompaignReview