import React, { useState, useEffect } from 'react';
import { Users, Mail, Clock, Send, ChevronDown, ChevronRight } from 'lucide-react';
import { useUsers } from './hooks/useUsers';


const mockAPI = {
  getUsers: async () => {
    return [
      { _id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
      { _id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
      { _id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'active' }
    ];
  },
  getRounds: async () => {
    return [
      { _id: 'r1', name: 'Round 1 - Initial Contact', order: 1 },
      { _id: 'r2', name: 'Round 2 - Follow-up', order: 2 },
      { _id: 'r3', name: 'Round 3 - Final Reminder', order: 3 }
    ];
  },
  getTemplates: async (roundId) => {
    return [
      { _id: 't1', roundId, name: 'Template A', subject: 'Welcome!', body: 'Hello {{name}}, welcome to our platform.' },
      { _id: 't2', roundId, name: 'Template B', subject: 'Getting Started', body: 'Hi {{name}}, here are some tips.' }
    ];
  },
  sendEmail: async (userId, roundId, templateId) => {
    return { success: true, sentAt: new Date().toISOString() };
  },
  getHistory: async (userId) => {
    return [
      { _id: 'h1', roundName: 'Round 1', templateName: 'Template A', sentAt: '2025-11-10T10:30:00Z' },
      { _id: 'h2', roundName: 'Round 2', templateName: 'Template B', sentAt: '2025-11-12T14:20:00Z' }
    ];
  }
};

export default function EmailTemplateManager() {
  const [users, setUsers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [expandedRound, setExpandedRound] = useState(null);
  const [templates, setTemplates] = useState({});
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);



    const { data } = useUsers(); // 👍

    console.log('data', data)
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [usersData, roundsData] = await Promise.all([
      mockAPI.getUsers(),
      mockAPI.getRounds()
    ]);
    setUsers(usersData);
    setRounds(roundsData);
    setLoading(false);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleUserExpansion = async (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
      if (!history[userId]) {
        const userHistory = await mockAPI.getHistory(userId);
        setHistory(prev => ({ ...prev, [userId]: userHistory }));
      }
    }
  };

  const toggleRoundExpansion = async (roundId) => {
    if (expandedRound === roundId) {
      setExpandedRound(null);
    } else {
      setExpandedRound(roundId);
      if (!templates[roundId]) {
        const roundTemplates = await mockAPI.getTemplates(roundId);
        setTemplates(prev => ({ ...prev, [roundId]: roundTemplates }));
      }
    }
  };

  const sendEmailToUser = async (userId, roundId, templateId) => {
    const user = users.find(u => u._id === userId);
    const round = rounds.find(r => r._id === roundId);
    const template = templates[roundId]?.find(t => t._id === templateId);
    
    if (!user || !round || !template) return;

    const result = await mockAPI.sendEmail(userId, roundId, templateId);
    
    if (result.success) {
      const newHistoryItem = {
        _id: Date.now().toString(),
        roundName: round.name,
        templateName: template.name,
        sentAt: result.sentAt
      };
      
      setHistory(prev => ({
        ...prev,
        [userId]: [...(prev[userId] || []), newHistoryItem]
      }));
      
      alert(`Email sent to ${user.name}!`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Mail className="w-7 h-7 text-blue-600" />
            Email Template Manager
          </h1>
          <p className="text-gray-600">Manage users, rounds, and email templates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Users ({selectedUsers.length} selected)
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {data?.map(user => (
                <div key={user._id} className="p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => toggleUserSelection(user._id)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                        <button
                          onClick={() => toggleUserExpansion(user._id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedUser === user._id ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      
                      {expandedUser === user._id && (
                        <div className="mt-4 p-3 bg-gray-50 rounded">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Clock className="w-4 h-4" />
                            Email History
                          </div>
                          {history[user._id]?.length > 0 ? (
                            <div className="space-y-2">
                              {history[user._id].map(item => (
                                <div key={item._id} className="text-sm bg-white p-2 rounded border border-gray-200">
                                  <div className="font-medium text-gray-900">{item.roundName}</div>
                                  <div className="text-gray-600">{item.templateName}</div>
                                  <div className="text-gray-400 text-xs mt-1">
                                    {new Date(item.sentAt).toLocaleString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">No emails sent yet</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rounds & Templates Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                Rounds & Templates
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {rounds.map(round => (
                <div key={round._id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{round.name}</div>
                    <button
                      onClick={() => toggleRoundExpansion(round._id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedRound === round._id ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  {expandedRound === round._id && (
                    <div className="mt-4 space-y-3">
                      {templates[round._id]?.map(template => (
                        <div key={template._id} className="p-3 bg-gray-50 rounded border border-gray-200">
                          <div className="font-medium text-gray-900 mb-1">{template.name}</div>
                          <div className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Subject:</span> {template.subject}
                          </div>
                          <div className="text-sm text-gray-500 mb-3">{template.body}</div>
                          
                          {selectedUsers.length > 0 && (
                            <div className="space-y-2">
                              {selectedUsers.map(userId => {
                                const user = users.find(u => u._id === userId);
                                return (
                                  <button
                                    key={userId}
                                    onClick={() => sendEmailToUser(userId, round._id, template._id)}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                                  >
                                    <span>Send to {user.name}</span>
                                    <Send className="w-4 h-4" />
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}