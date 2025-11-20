import { Clock } from 'lucide-react'
import React from 'react'

const CompaignSchedul = ({setNewCampaign,newCampaign,campaignStep,setCampaignStep}) => {
  return (
    <div>
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule Campaign</h2>
      <p className="text-gray-600 mb-8">Choose when to send your campaign</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Send Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={newCampaign.date}
              onChange={(e) => setNewCampaign({...newCampaign, date: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Send Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={newCampaign.time}
              onChange={(e) => setNewCampaign({...newCampaign, time: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={newCampaign.timezone}
            onChange={(e) => setNewCampaign({...newCampaign, timezone: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="UTC">UTC (Coordinated Universal Time)</option>
            <option value="EST">EST (Eastern Standard Time)</option>
            <option value="PST">PST (Pacific Standard Time)</option>
            <option value="GMT">GMT (Greenwich Mean Time)</option>
            <option value="IST">IST (Indian Standard Time)</option>
          </select>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Clock className="text-blue-600 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm mb-1">Optimal Send Time</h4>
              <p className="text-sm text-blue-700">
                Based on your audience engagement, we recommend sending between 10:00 AM - 2:00 PM on Tuesday or Thursday.
              </p>
            </div>
          </div>
        </div>

        {newCampaign.type === 'one-time' && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Send Immediately</span>
              <input type="checkbox" className="rounded" />
            </div>
            <p className="text-xs text-gray-600">
              Send this campaign immediately after creation instead of scheduling
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={() => setCampaignStep(2)}
          className="px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold"
        >
          Back
        </button>
        <button
          onClick={() => setCampaignStep(4)}
          disabled={!newCampaign.date || !newCampaign.time}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Review Campaign
        </button>
      </div>
    </div>
</div>
  )
}

export default CompaignSchedul