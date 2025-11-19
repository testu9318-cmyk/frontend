import React, { useState } from 'react';
import { 
  Calendar, Clock, Mail, Send, Pause, Play, Trash2, Edit, Plus, 
  Users, TrendingUp, AlertCircle, CheckCircle, XCircle, RefreshCw,
  ChevronLeft, ChevronRight, Globe, Repeat, ArrowRight, BarChart3,
  Settings, Filter, Search, Download, MoreVertical, Copy, Eye
} from 'lucide-react';

export default function CampaignScheduler() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  // Sample data
  const campaigns = [
    { 
      id: 1, 
      name: 'Welcome Series - Q1', 
      status: 'scheduled', 
      type: 'once',
      sendDate: '2024-11-25T10:00:00',
      timezone: 'America/New_York',
      recipients: 1250,
      subject: 'Welcome to our platform!',
      template: 'Welcome Template v2'
    },
    { 
      id: 2, 
      name: 'Weekly Newsletter', 
      status: 'active', 
      type: 'recurring',
      frequency: 'weekly',
      sendTime: '09:00',
      timezone: 'UTC',
      recipients: 5420,
      subject: 'Weekly Updates & News',
      template: 'Newsletter Template'
    },
    { 
      id: 3, 
      name: 'Product Launch Campaign', 
      status: 'sent', 
      type: 'once',
      sendDate: '2024-11-15T14:30:00',
      timezone: 'America/Los_Angeles',
      recipients: 3200,
      delivered: 3150,
      opened: 1890,
      clicked: 567,
      subject: 'Introducing our new product!',
      template: 'Product Launch Template'
    },
    { 
      id: 4, 
      name: 'Monthly Digest', 
      status: 'active', 
      type: 'recurring',
      frequency: 'monthly',
      sendTime: '08:00',
      timezone: 'Europe/London',
      recipients: 8900,
      subject: 'Your Monthly Summary',
      template: 'Digest Template'
    },
    { 
      id: 5, 
      name: 'Re-engagement Campaign', 
      status: 'paused', 
      type: 'once',
      sendDate: '2024-11-28T15:00:00',
      timezone: 'Asia/Tokyo',
      recipients: 890,
      subject: 'We miss you!',
      template: 'Re-engagement Template'
    }
  ];

  const queueStats = {
    pending: 1250,
    processing: 45,
    completed: 8920,
    failed: 12
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">Active</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Scheduled Campaigns</p>
          <p className="text-3xl font-bold text-gray-800">8</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Send className="text-green-600" size={24} />
            </div>
            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">+12%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Sent This Month</p>
          <p className="text-3xl font-bold text-gray-800">15.2K</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Repeat className="text-purple-600" size={24} />
            </div>
            <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">Automated</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Recurring Campaigns</p>
          <p className="text-3xl font-bold text-gray-800">4</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">+8.5%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Avg. Open Rate</p>
          <p className="text-3xl font-bold text-gray-800">42.5%</p>
        </div>
      </div>

      {/* Queue Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Queue Status</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-3xl font-bold text-yellow-600 mb-1">{queueStats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600 mb-1">{queueStats.processing}</p>
            <p className="text-sm text-gray-600">Processing</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600 mb-1">{queueStats.completed}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-3xl font-bold text-red-600 mb-1">{queueStats.failed}</p>
            <p className="text-sm text-gray-600">Failed</p>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Recent Campaigns</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div className="divide-y divide-gray-200">
          {campaigns.slice(0, 3).map((campaign) => (
            <div key={campaign.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-800">{campaign.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                      campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status}
                    </span>
                    {campaign.type === 'recurring' && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Repeat size={12} />
                        {campaign.frequency}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {campaign.recipients.toLocaleString()} recipients
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe size={12} />
                      {campaign.timezone}
                    </span>
                    {campaign.sendDate && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(campaign.sendDate).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const scheduledCampaigns = campaigns.filter(c => c.status === 'scheduled');
    
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Campaign Calendar</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-1 rounded text-sm font-medium ${viewMode === 'month' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}
                >
                  Month
                </button>
                <button 
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-1 rounded text-sm font-medium ${viewMode === 'week' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setViewMode('day')}
                  className={`px-3 py-1 rounded text-sm font-medium ${viewMode === 'day' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}
                >
                  Day
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
                <Plus size={18} />
                Schedule Campaign
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-gray-800">November 2024</h4>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft size={20} />
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">Today</button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2; // Starting from -2 to show previous month
              const isToday = day === 19;
              const hasCampaign = [25, 28].includes(day);
              
              return (
                <div
                  key={i}
                  className={`min-h-24 border border-gray-200 rounded-lg p-2 ${
                    day < 1 || day > 30 ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                  } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    day < 1 || day > 30 ? 'text-gray-400' : 'text-gray-700'
                  } ${isToday ? 'text-blue-600' : ''}`}>
                    {day > 0 && day <= 30 ? day : ''}
                  </div>
                  {hasCampaign && (
                    <div className="space-y-1">
                      <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded truncate">
                        Welcome Series
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Scheduled Campaigns List */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-4">Upcoming Campaigns</h4>
            <div className="space-y-3">
              {scheduledCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800">{campaign.name}</h5>
                    <p className="text-sm text-gray-600">{new Date(campaign.sendDate).toLocaleString()}</p>
                  </div>
                  <span className="text-sm text-gray-600">{campaign.recipients} recipients</span>
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                    <Edit size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Scheduled</option>
            <option>Paused</option>
            <option>Sent</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Types</option>
            <option>One-time</option>
            <option>Recurring</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
          <Plus size={18} />
          New Campaign
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schedule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-800">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.subject}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {campaign.type === 'recurring' ? (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                      <Repeat size={12} />
                      {campaign.frequency}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-600">One-time</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-800">{campaign.recipients.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    {campaign.sendDate ? (
                      <>
                        <div className="text-gray-800">{new Date(campaign.sendDate).toLocaleDateString()}</div>
                        <div className="text-gray-500">{new Date(campaign.sendDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </>
                    ) : (
                      <div className="text-gray-600">{campaign.sendTime} {campaign.timezone}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {campaign.status === 'sent' ? (
                    <div className="text-sm">
                      <div className="text-gray-800">{((campaign.opened / campaign.delivered) * 100).toFixed(1)}% open</div>
                      <div className="text-gray-500">{((campaign.clicked / campaign.delivered) * 100).toFixed(1)}% click</div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {campaign.status === 'active' ? (
                      <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg" title="Pause">
                        <Pause size={16} />
                      </button>
                    ) : campaign.status === 'paused' ? (
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Resume">
                        <Play size={16} />
                      </button>
                    ) : null}
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Duplicate">
                      <Copy size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
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

  const renderWorkflow = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Sequence Builder</h2>
          <p className="text-gray-600">Create automated email workflows with drag & drop</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Activate Workflow
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Workflow Steps Sidebar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Workflow Steps</h3>
          <div className="space-y-2">
            <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-move">
              <div className="flex items-center gap-2 mb-1">
                <Mail size={16} className="text-blue-600" />
                <span className="text-sm font-medium">Send Email</span>
              </div>
              <p className="text-xs text-gray-500">Send an email to recipient</p>
            </div>
            <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 cursor-move">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-purple-600" />
                <span className="text-sm font-medium">Wait/Delay</span>
              </div>
              <p className="text-xs text-gray-500">Wait for specified time</p>
            </div>
            <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 cursor-move">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm font-medium">Condition</span>
              </div>
              <p className="text-xs text-gray-500">Branch based on action</p>
            </div>
            <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 cursor-move">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-orange-600" />
                <span className="text-sm font-medium">Update Contact</span>
              </div>
              <p className="text-xs text-gray-500">Modify contact properties</p>
            </div>
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="col-span-3 bg-white rounded-lg border border-gray-200 p-6">
          <div className="bg-gray-50 rounded-lg p-8 min-h-[600px] border-2 border-dashed border-gray-300">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Start */}
              <div className="flex flex-col items-center">
                <div className="w-48 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-4 text-center shadow-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Play size={20} />
                    <span className="font-semibold">Workflow Start</span>
                  </div>
                  <p className="text-xs text-green-100">Triggered when user signs up</p>
                </div>
                <div className="w-1 h-12 bg-gray-300"></div>
                <ArrowRight className="text-gray-400 rotate-90" size={24} />
              </div>

              {/* Step 1: Welcome Email */}
              <div className="flex flex-col items-center">
                <div className="w-64 bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="text-blue-600" />
                      <span className="font-semibold text-gray-800">Welcome Email</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Template: Welcome v2</p>
                  <p className="text-xs text-gray-500">Send immediately</p>
                </div>
                <div className="w-1 h-12 bg-gray-300"></div>
                <ArrowRight className="text-gray-400 rotate-90" size={24} />
              </div>

              {/* Step 2: Wait */}
              <div className="flex flex-col items-center">
                <div className="w-64 bg-white border-2 border-purple-500 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-purple-600" />
                      <span className="font-semibold text-gray-800">Wait 2 Days</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Delay: 48 hours</p>
                </div>
                <div className="w-1 h-12 bg-gray-300"></div>
                <ArrowRight className="text-gray-400 rotate-90" size={24} />
              </div>

              {/* Step 3: Follow-up Email */}
              <div className="flex flex-col items-center">
                <div className="w-64 bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="text-blue-600" />
                      <span className="font-semibold text-gray-800">Getting Started Guide</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Template: Tutorial Email</p>
                  <p className="text-xs text-gray-500">Send at 10:00 AM user timezone</p>
                </div>
                <div className="w-1 h-12 bg-gray-300"></div>
                <ArrowRight className="text-gray-400 rotate-90" size={24} />
              </div>

              {/* Step 4: Condition */}
              <div className="flex flex-col items-center">
                <div className="w-64 bg-white border-2 border-green-500 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-green-600" />
                      <span className="font-semibold text-gray-800">Did User Open?</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Check email engagement</p>
                </div>
              </div>

              {/* Add Step Button */}
              <div className="flex justify-center">
                <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2">
                  <Plus size={18} />
                  Add Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecurring = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recurring Campaigns</h2>
          <p className="text-gray-600">Set up automated daily, weekly, or monthly email campaigns</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
          <Plus size={18} />
          New Recurring Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {campaigns.filter(c => c.type === 'recurring').map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{campaign.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {campaign.status}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <Repeat size={12} />
                    {campaign.frequency}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{campaign.subject}</p>
              </div>
              <div className="flex items-center gap-2">
                {campaign.status === 'active' ? (
                  <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 font-medium flex items-center gap-2">
                    <Pause size={16} />
                    Pause
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium flex items-center gap-2">
                    <Play size={16} />
                    Resume
                  </button>
                )}
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Frequency</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">{campaign.frequency}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Send Time</p>
                <p className="text-lg font-semibold text-gray-800">{campaign.sendTime}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Timezone</p>
                <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Globe size={16} />
                  {campaign.timezone}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Recipients</p>
                <p className="text-lg font-semibold text-gray-800">{campaign.recipients.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>Next send: {campaign.frequency === 'weekly' ? 'Monday, 9:00 AM' : campaign.frequency === 'monthly' ? '1st of next month, 8:00 AM' : 'Tomorrow, 9:00 AM'}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View History</button>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Recurring Campaign Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Repeat className="text-blue-600" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Create Your First Recurring Campaign</h3>
        <p className="text-gray-600 mb-6">Set up automated email campaigns that run daily, weekly, or monthly</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 mx-auto">
          <Plus size={20} />
          Get Started
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex ">


      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200  sm:flex-row sm:justify-between">
        <div className="px-8 sm:flex-row sm:justify-between">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-6 py-4 font-medium ${
              activeTab === 'dashboard' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BarChart3 size={18} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-6 py-4 font-medium ${
              activeTab === 'calendar' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar size={18} />
            Calendar
          </button>
          <button 
            onClick={() => setActiveTab('campaigns')}
            className={`flex items-center gap-2 px-6 py-4 font-medium ${
              activeTab === 'campaigns' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Mail size={18} />
            All Campaigns
          </button>
          <button 
            onClick={() => setActiveTab('recurring')}
            className={`flex items-center gap-2 px-6 py-4 font-medium ${
              activeTab === 'recurring' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Repeat size={18} />
            Recurring
          </button>
          <button 
            onClick={() => setActiveTab('workflow')}
            className={`flex items-center gap-2 px-6 py-4 font-medium ${
              activeTab === 'workflow' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <ArrowRight size={18} />
            Workflow Builder
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6 flex flex-col">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'recurring' && renderRecurring()}
        {activeTab === 'workflow' && renderWorkflow()}
      </div>
    </div>

  );
}