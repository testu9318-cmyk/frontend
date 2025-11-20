import { X } from "lucide-react";
import CompaignType from "./CompaignType";
import CompaignForm from "./CompaignForm";
import CompaignSchedul from "./CompaignSchedul";
import CompaignReview from "./CompaignReview";

const CompaignStep = ({
  setShowNewCampaign,
  setCampaignStep,
  campaignStep,
  newCampaign,
  setNewCampaign,
}) => {
  return (
    <div>
<div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Create New Campaign
              </h2>
              <p className="text-sm text-gray-600">Step {campaignStep} of 4</p>
            </div>
            <button
              onClick={() => {
                setShowNewCampaign(false);
                setCampaignStep(1);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 rounded-full transition ${
                    step <= campaignStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {campaignStep === 1 && (
              <CompaignType
                setShowNewCampaign={setShowNewCampaign}
                setCampaignStep={setCampaignStep}
                campaignStep={campaignStep}
                setNewCampaign={setNewCampaign}
                newCampaign={newCampaign}
              />
            )}
            {campaignStep === 2 && (
              <CompaignForm
                setShowNewCampaign={setShowNewCampaign}
                setCampaignStep={setCampaignStep}
                campaignStep={campaignStep}
                setNewCampaign={setNewCampaign}
                newCampaign={newCampaign}
              />
            )}
            {campaignStep === 3 && (
              <CompaignSchedul
                setShowNewCampaign={setShowNewCampaign}
                setCampaignStep={setCampaignStep}
                campaignStep={campaignStep}
                setNewCampaign={setNewCampaign}
                newCampaign={newCampaign}
              />
            )}
            {campaignStep === 4 && (
              <CompaignReview
                setShowNewCampaign={setShowNewCampaign}
                setCampaignStep={setCampaignStep}
                campaignStep={campaignStep}
                setNewCampaign={setNewCampaign}
                newCampaign={newCampaign}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaignStep;
