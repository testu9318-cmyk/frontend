import React, { useState } from 'react';
import { 
  Home, Mail, Bell, Users, Shield, Link2, CreditCard, Palette, Settings,
  User, Lock, Globe, Send, Server, FileText, AlertCircle, Smartphone,
  Eye, Layout, Accessibility, Code, FileCheck, Database, ChevronRight,
  Save, X, Check, Plus, Trash2, Edit, Key, Webhook, Zap, ArrowLeft,
  BarChart3, MessageSquare, Download, RefreshCw
} from 'lucide-react';

export default function SettingsDashboard( { onClose } ) {
  const [activeSection, setActiveSection] = useState('general');
  const [activeSubSection, setActiveSubSection] = useState('profile');
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const settingsMenu = [
    {
      id: 'general',
      label: 'General',
      icon: Home,
      subsections: [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'account', label: 'Account', icon: Settings },
        { id: 'preferences', label: 'Preferences', icon: Globe }
      ]
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      subsections: [
        { id: 'sender', label: 'Sender Settings', icon: Send },
        { id: 'smtp', label: 'SMTP Configuration', icon: Server },
        { id: 'signature', label: 'Signature', icon: FileText }
      ]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      subsections: [
        { id: 'email-alerts', label: 'Email Alerts', icon: Mail },
        { id: 'in-app', label: 'In-App Notifications', icon: Bell },
        { id: 'digest', label: 'Digest Settings', icon: FileText }
      ]
    },
    {
      id: 'team',
      label: 'Team',
      icon: Users,
      subsections: [
        { id: 'members', label: 'Members', icon: Users },
        { id: 'roles', label: 'Roles & Permissions', icon: Shield },
        { id: 'invitations', label: 'Invitations', icon: Send }
      ]
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      subsections: [
        { id: 'password', label: 'Password', icon: Lock },
        { id: 'two-factor', label: 'Two-Factor Auth', icon: Smartphone },
        { id: 'sessions', label: 'Sessions', icon: Eye },
        { id: 'activity', label: 'Activity Log', icon: FileText }
      ]
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Link2,
      subsections: [
        { id: 'apps', label: 'Connected Apps', icon: Zap },
        { id: 'webhooks', label: 'Webhooks', icon: Webhook },
        { id: 'api-keys', label: 'API Keys', icon: Key }
      ]
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      subsections: [
        { id: 'plan', label: 'Plan & Usage', icon: FileText },
        { id: 'payment', label: 'Payment Methods', icon: CreditCard },
        { id: 'invoices', label: 'Invoices', icon: FileText }
      ]
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: Palette,
      subsections: [
        { id: 'theme', label: 'Theme', icon: Palette },
        { id: 'layout', label: 'Layout', icon: Layout },
        { id: 'accessibility', label: 'Accessibility', icon: Accessibility }
      ]
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: Settings,
      subsections: [
        { id: 'developer', label: 'Developer', icon: Code },
        { id: 'compliance', label: 'Compliance', icon: FileCheck },
        { id: 'data', label: 'Data Management', icon: Database }
      ]
    }
  ];

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const renderContent = () => {
    if (activeSection === 'general' && activeSubSection === 'profile') {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Settings</h2>
            <p className="text-gray-600">Manage your personal information and profile details</p>
          </div>

          <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-lg">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Change Photo
              </button>
              <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" defaultValue="John" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tell us about yourself..."></textarea>
          </div>
        </div>
      );
    }

    if (activeSection === 'email' && activeSubSection === 'smtp') {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">SMTP Configuration</h2>
            <p className="text-gray-600">Configure your SMTP server for sending emails</p>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Important</p>
              <p>Incorrect SMTP settings may prevent email delivery. Please verify your credentials.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
              <input type="text" placeholder="smtp.example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
              <input type="number" placeholder="587" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>TLS</option>
              <option>SSL</option>
              <option>None</option>
            </select>
          </div>

          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
            Test Connection
          </button>
        </div>
      );
    }

    if (activeSection === 'team' && activeSubSection === 'members') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Team Members</h2>
              <p className="text-gray-600">Manage your team members and their access</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
              <Plus size={18} />
              Invite Member
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                  { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
                  { name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Invited' }
                ].map((member, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full py-20">
        <div className="text-center">
          <Settings className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Settings Page</h3>
          <p className="text-gray-500">Select a section from the sidebar to view settings</p>
        </div>
      </div>
    );
  };


  // Settings View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onClose()}
              className="p-2 hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Settings size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Settings</h1>
                <p className="text-sm text-gray-300">Manage your application settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            {settingsMenu.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <div key={section.id} className="mb-2">
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      setActiveSubSection(section.subsections[0].id);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="flex-1 text-left">{section.label}</span>
                    <ChevronRight size={16} className={`transition-transform ${isActive ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {isActive && (
                    <div className="ml-4 mt-1 space-y-1">
                      {section.subsections.map((sub) => {
                        const SubIcon = sub.icon;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setActiveSubSection(sub.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                              activeSubSection === sub.id
                                ? 'bg-blue-100 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <SubIcon size={16} />
                            <span>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-8">
            {renderContent()}
            
            {/* Save Button */}
            <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <Check size={20} />
          <span className="font-medium">Settings saved successfully!</span>
        </div>
      )}
    </div>
  );
}