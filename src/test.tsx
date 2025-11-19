import React, { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Clock,
  Send,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useUsers } from "./hooks/useUsers";
import { useRounds } from "./hooks/useRounds";
import { useTemplates, useTemplatesByRound } from "./hooks/useTemplates";
import { useBulkEmail } from "./hooks/useSendEmails";
import { useHistory } from "./hooks/useHistory";
import HomePage from "./pages/HomePage.jsx";

export default function EmailTemplateManager() {
  const [users, setUsers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [expandedRound, setExpandedRound] = useState(null);
  const [templates, setTemplates] = useState({});
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);

  const { data } = useUsers();
  const { data: roundData } = useRounds();
  const { data: templatesData } = useTemplates();

  const { mutate: sendEmail, isPending, isSuccess, error } = useBulkEmail();
  const userHistoryQuery = useHistory(expandedUser || "");

  // console.log('data', data)

  useEffect(() => {
    if (data && roundData) {
      setUsers(data);
      setRounds(roundData);
      setTemplates(templatesData);
      setLoading(false);
    }
  }, [data, roundData, templatesData]);

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleUserExpansion = (userId: string) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  const toggleRoundExpansion = async (roundId) => {
    if (expandedRound === roundId) {
      setExpandedRound(null);
    } else {
      setExpandedRound(roundId);
      if (!templates[roundId]) {
        const roundTemplates = useTemplatesByRound(roundId);
        setTemplates((prev) => ({ ...prev, [roundId]: roundTemplates }));
      }
    }
  };

  const sendEmailToUser = async (userIds, roundId, templateId) => {
    const result = await sendEmail({
      userIds, // already an array
      roundId,
      templateId,
    });

    console.log("Email sent:", result);
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
              {data?.map((user) => (
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
                          <div className="font-medium text-gray-900">
                            {user.firstName + " " + user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
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

                          {userHistoryQuery.isLoading ? (
                            <div className="text-sm text-gray-500">
                              Loading...
                            </div>
                          ) : userHistoryQuery.isError ? (
                            <div className="text-sm text-red-500">
                              Failed to load history
                            </div>
                          ) : userHistoryQuery.data?.data.length > 0 ? (
                            <div className="space-y-2">
                              {userHistoryQuery.data?.data.map((item) => (
                                <div
                                  key={item._id}
                                  className="text-sm bg-white p-2 rounded border border-gray-200"
                                >
                                  <div className="font-medium text-gray-900">
                                    {item.roundId?.name}
                                  </div>
                                  <div className="text-gray-600">
                                    {item.templateId?.name}
                                  </div>
                                  <div className="text-gray-400 text-xs mt-1">
                                    Status: {item.status} <br />
                                    Sent at:{" "}
                                    {new Date(item.sentAt).toLocaleString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">
                              No emails sent yet
                            </div>
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
              {roundData?.map((round) => (
                <div key={round._id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">
                      {round.name}
                    </div>
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
                      {templates
                        ?.filter((t) => t.roundId._id === round._id) //  match templates to round
                        .map((template) => (
                          <div
                            key={template._id}
                            className="p-3 bg-gray-50 rounded border border-gray-200"
                          >
                            <div className="font-medium text-gray-900 mb-1">
                              {template.name}
                            </div>
                            <div className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Subject:</span>{" "}
                              {template.subject}
                            </div>
                            <div className="text-sm text-gray-500 mb-3">
                              {template.body}
                            </div>

                            {selectedUsers.length > 0 && (
                              <button
                                onClick={() =>
                                  sendEmailToUser(
                                    selectedUsers,
                                    round._id,
                                    template._id
                                  )
                                }
                                className="w-full flex items-center justify-between px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm mt-2"
                              >
                                <span>
                                  Send to {selectedUsers.length} selected users
                                </span>
                                <Send className="w-4 h-4" />
                              </button>
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
  );
}
