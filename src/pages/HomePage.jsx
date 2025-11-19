import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import EmailTemplateManager from '../test';
import Templates from "../Components/Templates";
import EmailDashboard from "../Components/EmailDashboard";
import BulkCSVUpload from "../Components/BulkCSVUpload";
import SettingsDashboard from "../Components/SettingsDashboard";
import CampaignScheduler from "../Components/CampaignScheduler";

function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return (
      <SettingsDashboard onClose={() => setShowSettings(false)} />
    );
  }

  return (
    <div>
      <Navbar
        setActiveTab={setActiveTab}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
        activeTab={activeTab}
      />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <EmailDashboard />}
        {activeTab === 'users' && <EmailTemplateManager />}
        {activeTab === 'templates' && <Templates />}
        {activeTab === 'BulkEmail' && <BulkCSVUpload />}
        {activeTab=== 'CampaignScheduler' && <CampaignScheduler/>}
      </main>
    </div>
  );
}

export default HomePage;
