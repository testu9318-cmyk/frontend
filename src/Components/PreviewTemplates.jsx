import React, { useState } from "react";
import {
  X,
  Copy,
  Edit,
  Trash2,
  Mail,
  Calendar,
  User,
  CheckCircle,
} from "lucide-react";

function PreviewTemplates({
  PreviewTemplatesData,
  setShowPrev,
  OnEditTEmplates,
}) {
  const template = PreviewTemplatesData[0];
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(null), 5000);
  }; // For demonstration, we pick the first template
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-2 px-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-1">Template Preview</h4>
            <p className="text-blue-100 text-sm">{template.name}</p>
          </div>
          <button
            onClick={() => setShowPrev(false)}
            className="p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Email Header Info */}
          <div className="bg-gray-50 p-6 border-b">
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600 w-24">
                  Subject:
                </span>
                <span className="text-gray-800 font-medium">
                  {template.subject}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600 w-24">
                  Round:
                </span>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {template?.roundId?.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600 w-24">
                  Category:
                </span>
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {template.category}
                </span>
              </div>

              <div className="flex text-sm items-center gap-2.5   text-gray-600 mb-1">
                <span>Created at:</span>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                  {new Date(template.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Email Preview */}
          <div className="p-6">
            <div className="max-w-3xl mx-auto">
              {/* Email Container */}
              <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                {/* Email Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
                  <h3 className="text-xl font-bold">Your Company Name</h3>
                  <p className="text-sm text-blue-100">
                    support@yourcompany.com
                  </p>
                </div>

                {/* Email Body */}
                <div className="p-8">
                  <div className="prose max-w-none">
                    {template.body.split("\n").map((line, index) => {
                      // Handle empty lines
                      if (line.trim() === "") {
                        return <div key={index} className="h-4"></div>;
                      }

                      // Handle bullet points
                      if (line.trim().startsWith("•")) {
                        return (
                          <div key={index} className="flex gap-2 mb-2">
                            <span className="text-blue-600">•</span>
                            <span className="text-gray-700">
                              {line.trim().substring(1).trim()}
                            </span>
                          </div>
                        );
                      }

                      // Handle variable highlighting
                      const highlightVariables = (text) => {
                        const parts = text.split(/({{[^}]+}})/g);
                        return parts.map((part, i) => {
                          if (part.match(/{{[^}]+}}/)) {
                            return (
                              <span
                                key={i}
                                className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-mono text-sm"
                              >
                                {part}
                              </span>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        });
                      };

                      return (
                        <p
                          key={index}
                          className="text-gray-700 mb-3 leading-relaxed"
                        >
                          {highlightVariables(line)}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Email Footer */}
                <div className="bg-gray-50 p-2 border-t text-center text-sm text-gray-600">
                  <p className="mb-2">
                    © 2025 Your Company. All rights reserved.
                  </p>
                  <p className="text-xs">
                    <a href="#" className="text-blue-600 hover:underline">
                      Unsubscribe
                    </a>
                    {" • "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              {/* Variables Legend */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <User size={18} />
                  Template Variables
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <code className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-mono text-xs">
                      {"{{firstName}}"}
                    </code>
                    <span className="text-gray-600">User's first name</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-mono text-xs">
                      {"{{email}}"}
                    </code>
                    <span className="text-gray-600">User's email address</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-mono text-xs">
                      {"{{accountId}}"}
                    </code>
                    <span className="text-gray-600">Account ID</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t p-3 bg-gray-50 flex justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="px-6 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 font-semibold"
            >
              {copied ? (
                <>
                  <CheckCircle size={18} className="text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Content
                </>
              )}
            </button>

            <button
              className="px-6 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 font-semibold"
              onClick={() => OnEditTEmplates(template)}
            >
              <Edit size={18} />
              Edit Template
            </button>
          </div>

          <button
            onClick={() => setShowPrev(false)}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewTemplates;
