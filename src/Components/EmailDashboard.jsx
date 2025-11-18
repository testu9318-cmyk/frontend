import React, { useState } from 'react';
import { 
  Mail, Users, BarChart3, Calendar, Send, TrendingUp, TrendingDown, 
  MailOpen, MousePointerClick, XCircle, CheckCircle, Clock, Eye,
  ArrowUp, ArrowDown, Activity, Target, Zap, Award, AlertCircle,
  Download, Filter, RefreshCw, ChevronRight
} from 'lucide-react';
import { useSentEmailCount, useTotalEmail } from '../hooks/useTemplates';

export default function EmailDashboard() {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const { data: totalEmails} = useTotalEmail()
  const {data: totalSentEmails } = useSentEmailCount()
  // Sample data

  const stats = {
    totalSent: { value: totalEmails?.totalEmails || 0, change: 12.5, trend: 'up' },
    delivered: { value: totalSentEmails?.totalSentEmails||0, change: 8.3, trend: 'up', percentage: 96.9 },
    opened: { value: 5234, change: 15.2, trend: 'up', percentage: 42.0 },
    clicked: { value: 2341, change: 5.8, trend: 'up', percentage: 18.8 },
    bounced: { value: 234, change: -3.2, trend: 'down', percentage: 1.8 },
    unsubscribed: { value: 89, change: -1.5, trend: 'down', percentage: 0.7 }
  };

  const weeklyData = [
    { day: 'Mon', sent: 1850, opened: 820, clicked: 340, bounced: 28 },
    { day: 'Tue', sent: 2120, opened: 950, clicked: 410, bounced: 32 },
    { day: 'Wed', sent: 1980, opened: 880, clicked: 380, bounced: 25 },
    { day: 'Thu', sent: 2340, opened: 1050, clicked: 480, bounced: 35 },
    { day: 'Fri', sent: 1890, opened: 840, clicked: 360, bounced: 22 },
    { day: 'Sat', sent: 1420, opened: 620, clicked: 270, bounced: 18 },
    { day: 'Sun', sent: 1247, opened: 550, clicked: 240, bounced: 15 }
  ];

  const topTemplates = [
    { id: 1, name: 'Welcome Series - Email 1', sent: 2340, openRate: 68.5, clickRate: 34.2, status: 'excellent' },
    { id: 2, name: 'Monthly Newsletter', sent: 8920, openRate: 45.8, clickRate: 18.9, status: 'good' },
    { id: 3, name: 'Product Update', sent: 1560, openRate: 52.3, clickRate: 24.1, status: 'good' },
    { id: 4, name: 'Re-engagement Campaign', sent: 3450, openRate: 28.4, clickRate: 12.5, status: 'average' },
    { id: 5, name: 'Abandoned Cart', sent: 890, openRate: 42.1, clickRate: 28.7, status: 'good' }
  ];

  const recentCampaigns = [
    { id: 1, name: 'Black Friday Special', status: 'completed', sent: 4500, openRate: 48.5, date: '2 hours ago' },
    { id: 2, name: 'Weekly Update #45', status: 'sending', sent: 2100, progress: 65, date: 'In progress' },
    { id: 3, name: 'User Survey', status: 'scheduled', sent: 0, scheduleDate: 'Tomorrow 10:00 AM' },
    { id: 4, name: 'Feature Announcement', status: 'completed', sent: 3200, openRate: 52.3, date: '1 day ago' }
  ];

  const engagementByTime = [
    { time: '6 AM', rate: 12 },
    { time: '9 AM', rate: 42 },
    { time: '12 PM', rate: 58 },
    { time: '3 PM', rate: 48 },
    { time: '6 PM', rate: 35 },
    { time: '9 PM', rate: 22 }
  ];

  const getStatusColor = (status) => {
    const colors = {
      excellent: 'bg-green-100 text-green-700',
      good: 'bg-blue-100 text-blue-700',
      average: 'bg-yellow-100 text-yellow-700',
      poor: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getCampaignStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700',
      sending: 'bg-blue-100 text-blue-700',
      scheduled: 'bg-purple-100 text-purple-700',
      draft: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-600">Email campaign analytics and insights</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="24hours">Last 24 Hours</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download size={18} />
                Export
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <RefreshCw size={18} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Sent */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Send className="text-blue-600" size={24} />
              </div>
              <span className={`flex items-center gap-1 text-sm font-semibold ${
                stats.totalSent.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.totalSent.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(stats.totalSent.change)}%
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Sent</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalSent.value.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">vs previous period</p>
            </div>
          </div>

          {/* Delivered */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <span className={`flex items-center gap-1 text-sm font-semibold ${
                stats.delivered.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.delivered.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(stats.delivered.change)}%
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Delivered</p>
              <p className="text-3xl font-bold text-gray-800">{stats.delivered.value.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">{stats.delivered.percentage}% delivery rate</p>
            </div>
          </div>

          {/* Open Rate */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <MailOpen className="text-purple-600" size={24} />
              </div>
              <span className={`flex items-center gap-1 text-sm font-semibold ${
                stats.opened.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.opened.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(stats.opened.change)}%
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Opened</p>
              <p className="text-3xl font-bold text-gray-800">{stats.opened.percentage}%</p>
              <p className="text-xs text-gray-500 mt-2">{stats.opened.value.toLocaleString()} opens</p>
            </div>
          </div>

          {/* Click Rate */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <MousePointerClick className="text-orange-600" size={24} />
              </div>
              <span className={`flex items-center gap-1 text-sm font-semibold ${
                stats.clicked.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.clicked.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(stats.clicked.change)}%
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Click Rate</p>
              <p className="text-3xl font-bold text-gray-800">{stats.clicked.percentage}%</p>
              <p className="text-xs text-gray-500 mt-2">{stats.clicked.value.toLocaleString()} clicks</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Weekly Performance</h3>
                <p className="text-sm text-gray-600">Email activity over the last 7 days</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Eye size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Bar Chart */}
            <div className="space-y-4">
              {weeklyData.map((day, index) => {
                const maxValue = Math.max(...weeklyData.map(d => d.sent));
                const sentWidth = (day.sent / maxValue) * 100;
                const openedWidth = (day.opened / maxValue) * 100;
                const clickedWidth = (day.clicked / maxValue) * 100;

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 w-12">{day.day}</span>
                      <div className="flex-1 mx-3 relative h-8">
                        <div 
                          className="absolute h-8 bg-blue-200 rounded"
                          style={{ width: `${sentWidth}%` }}
                        ></div>
                        <div 
                          className="absolute h-8 bg-blue-400 rounded"
                          style={{ width: `${openedWidth}%` }}
                        ></div>
                        <div 
                          className="absolute h-8 bg-blue-600 rounded"
                          style={{ width: `${clickedWidth}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-800 w-16 text-right">
                        {day.sent.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-200 rounded"></div>
                <span className="text-xs text-gray-600">Sent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <span className="text-xs text-gray-600">Opened</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-xs text-gray-600">Clicked</span>
              </div>
            </div>
          </div>

          {/* Engagement by Time */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Best Time to Send</h3>
                <p className="text-sm text-gray-600">Open rates by time of day</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Activity className="text-green-600" size={16} />
                <span className="font-semibold text-green-600">Peak: 12 PM</span>
              </div>
            </div>

            {/* Line Chart */}
            <div className="relative h-48">
              <div className="absolute inset-0 flex items-end justify-between gap-2">
                {engagementByTime.map((item, index) => {
                  const height = (item.rate / 60) * 100;
                  const isHighest = item.rate === Math.max(...engagementByTime.map(e => e.rate));
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="relative w-full flex flex-col items-center justify-end h-48">
                        <span className={`text-xs font-semibold mb-1 ${isHighest ? 'text-green-600' : 'text-gray-600'}`}>
                          {item.rate}%
                        </span>
                        <div 
                          className={`w-full rounded-t transition-all ${
                            isHighest ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-2">{item.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Optimal send window:</span>
                <span className="font-semibold text-gray-800">11 AM - 2 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Templates & Recent Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Templates */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Top Performing Templates</h3>
                  <p className="text-sm text-gray-600">Highest engagement rates</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="divide-y">
              {topTemplates.map((template, index) => (
                <div key={template.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg font-bold text-sm">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{template.name}</h4>
                        <p className="text-xs text-gray-500">{template.sent.toLocaleString()} sent</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                      {template.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 ml-11">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Open Rate</span>
                        <span className="font-semibold text-gray-800">{template.openRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-purple-500 h-1.5 rounded-full"
                          style={{ width: `${template.openRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Click Rate</span>
                        <span className="font-semibold text-gray-800">{template.clickRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-orange-500 h-1.5 rounded-full"
                          style={{ width: `${template.clickRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Recent Campaigns</h3>
                  <p className="text-sm text-gray-600">Latest campaign activity</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="divide-y">
              {recentCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">{campaign.name}</h4>
                      <p className="text-xs text-gray-500">{campaign.date || campaign.scheduleDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCampaignStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>

                  {campaign.status === 'sending' && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-800">{campaign.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{campaign.sent.toLocaleString()} / 3,200 sent</p>
                    </div>
                  )}

                  {campaign.status === 'completed' && (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-gray-800">{campaign.sent.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Sent</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-gray-800">{campaign.openRate}%</p>
                        <p className="text-xs text-gray-600">Opened</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-gray-800">
                          {Math.round((campaign.openRate / 2.5))}%
                        </p>
                        <p className="text-xs text-gray-600">Clicked</p>
                      </div>
                    </div>
                  )}

                  {campaign.status === 'scheduled' && (
                    <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 p-3 rounded">
                      <Clock size={16} />
                      <span>Scheduled for {campaign.scheduleDate}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm opacity-90">Average Open Rate</p>
                <p className="text-3xl font-bold">42.3%</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-90">Industry Average:</span>
                <span className="font-semibold">21.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Your Performance:</span>
                <span className="font-semibold">+96.7% better</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <Target size={24} />
              </div>
              <div>
                <p className="text-sm opacity-90">Engagement Score</p>
                <p className="text-3xl font-bold">8.7/10</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-90">Last Week:</span>
                <span className="font-semibold">8.2/10</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Improvement:</span>
                <span className="font-semibold">+6.1%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-sm opacity-90">Active Campaigns</p>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-90">Scheduled:</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">In Progress:</span>
                <span className="font-semibold">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="text-green-600 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="font-semibold text-green-900 text-sm">Excellent Delivery Rate</p>
                <p className="text-sm text-green-700">Your emails are being delivered at 96.9%, above the industry standard.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Activity className="text-blue-600 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="font-semibold text-blue-900 text-sm">Engagement Trending Up</p>
                <p className="text-sm text-blue-700">Your open rates have increased by 15.2% over the last week. Keep it up!</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="font-semibold text-yellow-900 text-sm">Template Optimization Suggestion</p>
                <p className="text-sm text-yellow-700">Consider A/B testing your subject lines to improve open rates further.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}