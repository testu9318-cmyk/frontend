import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import EmailTemplateManager from '../test'
import Templates from "../Components/Templates";

function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div>
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* {activeTab === 'dashboard' && <Dashboard />} */}
        {activeTab === 'users' && <EmailTemplateManager />}
        {activeTab === 'templates' && <Templates />}
        {/* {activeTab === 'campaigns' && <Campaigns />} */}
      </main>

    </div>
  );
}

export default HomePage;
