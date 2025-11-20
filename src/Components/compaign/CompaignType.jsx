import { Calendar, Send } from "lucide-react";

function CompaignType({ setCampaignStep, newCampaign, setNewCampaign }) {
  return (
    <div>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Select Campaign Type
        </h2>
        <p className="text-gray-600 mb-8">
          Choose how you want to send your campaign
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => {
              setNewCampaign({ ...newCampaign, type: "one-time" });
              setCampaignStep(2);
            }}
            className={`p-6 border-2 rounded-xl cursor-pointer transition hover:shadow-lg ${
              newCampaign?.type === "one-time"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Send className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  One-Time Campaign
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Send a single email to your audience at a specific time
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white border rounded text-xs text-gray-600">
                    Scheduled
                  </span>
                  <span className="px-2 py-1 bg-white border rounded text-xs text-gray-600">
                    Single Send
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              setNewCampaign({ ...newCampaign, type: "recurring" });
              setCampaignStep(2);
            }}
            className={`p-6 border-2 rounded-xl cursor-pointer transition hover:shadow-lg ${
              newCampaign.type === "recurring"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Recurring Campaign
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Automatically send emails on a regular schedule
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white border rounded text-xs text-gray-600">
                    Daily
                  </span>
                  <span className="px-2 py-1 bg-white border rounded text-xs text-gray-600">
                    Weekly
                  </span>
                  <span className="px-2 py-1 bg-white border rounded text-xs text-gray-600">
                    Monthly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompaignType;
