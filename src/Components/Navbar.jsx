import { Mail, Settings, BarChart3, Users, Calendar } from "lucide-react";

function Navbar({ activeTab, setActiveTab }) {
  return (
    <div className=" bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Mail className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Email Template Manager
              </h1>
              <p className="text-sm text-gray-600">
                Manage users, rounds, and email templates
              </p>
            </div>
          </div>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Settings size={18} />
            Settings
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "users", label: "Users", icon: Users },
              { id: "templates", label: "Templates", icon: Mail },
              { id: "campaigns", label: "Campaigns", icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 flex items-center gap-2 border-b-2 transition ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600 font-semibold"
                      : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
