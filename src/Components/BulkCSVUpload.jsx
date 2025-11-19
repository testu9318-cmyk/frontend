import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  Users,
  Mail,
  FileText,
  Eye,
  Trash2,
  Send,
  Filter,
  Search,
  XCircle,
} from "lucide-react";
import { useTemplates } from "../hooks/useTemplates";
import { useBulkEmail } from "../hooks/useSendEmails";

export default function BulkCSVUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mappedFields, setMappedFields] = useState({
    email: "",
    firstName: "",
    lastName: "",
    name: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sendProgress, setSendProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const { mutate: sendEmail, isPending, isSuccess, error } = useBulkEmail();
  const [responseData, setResponseData] = useState();
  const { data: templates } = useTemplates();
  const [showDetails, setShowDetails] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file");
      return;
    }

    setFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n").filter((line) => line.trim());

      if (lines.length === 0) {
        alert("CSV file is empty");
        return;
      }

      const headerLine = lines[0]
        .split(",")
        .map((h) => h.trim().replace(/"/g, ""));
      setHeaders(headerLine);

      const data = lines.slice(1).map((line, index) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
        const row = { id: index + 1 };
        headerLine.forEach((header, i) => {
          row[header] = values[i] || "";
        });
        return row;
      });

      setCsvData(data);
      setStep(2);
      autoMapFields(headerLine);
    };

    reader.readAsText(file);
  };

  const autoMapFields = (headers) => {
    const mapping = {};

    headers.forEach((header) => {
      const lower = header.toLowerCase();
      if (lower.includes("email") || lower === "e-mail") {
        mapping.email = header;
      } else if (lower.includes("first") && lower.includes("name")) {
        mapping.firstName = header;
      } else if (lower.includes("last") && lower.includes("name")) {
        mapping.lastName = header;
      } else if (lower === "name" || lower === "full name") {
        mapping.name = header;
      }
    });

    setMappedFields(mapping);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateData = () => {
    const errors = [];

    if (!mappedFields.email) {
      errors.push({ type: "error", message: "Email field must be mapped" });
      setValidationErrors(errors);
      return false;
    }

    csvData.forEach((row, index) => {
      const email = row[mappedFields.email];

      if (!email) {
        errors.push({
          type: "error",
          row: index + 1,
          message: `Row ${index + 1}: Email is required`,
        });
      } else if (!isValidEmail(email)) {
        errors.push({
          type: "error",
          row: index + 1,
          message: `Row ${index + 1}: Invalid email format - ${email}`,
        });
      }
    });

    setValidationErrors(errors);

    if (errors.length === 0) {
      setStep(3);
      setSelectedUsers(csvData.map((row) => row.id));
      return true;
    }

    return false;
  };

  const getTransformedData = () => {
    return csvData.map((row) => ({
      id: row.id,
      email: row[mappedFields.email] || "",
      firstName: row[mappedFields.firstName] || "",
      lastName: row[mappedFields.lastName] || "",
      name: row[mappedFields.name] || row[mappedFields.firstName] || "",
      rawData: row,
    }));
  };

  const handleSendEmails = async () => {
    console.log("selectedTemplate", selectedTemplate);
    if (!selectedTemplate) {
      alert("Please select a template");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("Please select at least one user");
      return;
    }

    setIsSending(true);
    setSendProgress(10);

    const usersToSend = getTransformedData().filter((user) =>
      selectedUsers.includes(user.id)
    );

    try {
      // Send users to backend to add them and send emails
      const result = await fetch(
        "http://localhost:5000/api/add-users-and-send-bulk-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userIds: usersToSend, // Already an array
            templateId: selectedTemplate,
          }),
        }
      );

      const responseData = await result.json();
      setResponseData(responseData);
      if (responseData.success) {
        // If success → complete progress
        setSendProgress(100);
      } else {
        // If not successful → simulate increasing progress until success comes
        let progress = 20;

        const interval = setInterval(() => {
          progress += 10;

          // Prevent going over 95% while waiting
          if (progress >= 95) {
            progress = 95;
          }

          setSendProgress(progress);
        }, 500);

        // When success finally comes
        if (responseData.success) {
          clearInterval(interval);
          setSendProgress(100);
        }
      }
    } catch (error) {
      console.error("Error adding users or sending emails:", error);
      alert("Error processing your request");
    }

    setIsSending(false);
    setStep(4);
  };

  const handleReset = () => {
    setFile(null);
    setCsvData([]);
    setHeaders([]);
    setMappedFields({ email: "", firstName: "", lastName: "", name: "" });
    setValidationErrors([]);
    setStep(1);
    setSelectedTemplate("");
    setSelectedUsers([]);
    setSendProgress(0);
    setIsSending(false);
  };

  const downloadSampleCSV = () => {
    const csvContent =
      "email,firstName,lastName,company\njohn.doe@example.com,John,Doe,Acme Inc\njane.smith@example.com,Jane,Smith,Tech Corp\nbob.wilson@example.com,Bob,Wilson,Design Co";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_users.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bulk Email Import & Send
          </h1>
          <p className="text-gray-600">
            Upload a CSV file to import users and send bulk emails
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Upload CSV", icon: Upload },
              { num: 2, label: "Map Fields", icon: FileText },
              { num: 3, label: "Review & Send", icon: Mail },
              { num: 4, label: "Complete", icon: CheckCircle },
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = step === item.num;
              const isCompleted = step > item.num;

              return (
                <React.Fragment key={item.num}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isActive ? "text-blue-600" : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded ${
                        step > item.num ? "bg-green-500" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {step === 1 && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Upload CSV File
                </h2>
                <p className="text-gray-600">
                  Drag and drop your CSV file or click to browse
                </p>
              </div>

              <div
                className={`border-3 border-dashed rounded-xl p-12 text-center transition cursor-pointer ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <Upload className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Drop your CSV file here
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  or click to browse from your computer
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  Select File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <FileText className="text-blue-600 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm mb-1">
                        Need a template?
                      </h4>
                      <p className="text-sm text-blue-700">
                        Download our sample CSV file to see the required format
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={downloadSampleCSV}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
                  >
                    <Download size={16} />
                    Sample CSV
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h4 className="font-semibold text-gray-700 text-sm">
                  CSV Requirements:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Must include an email column
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    First row should contain column headers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    File size should be less than 10MB
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Supports up to 10,000 rows
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      File Uploaded Successfully
                    </h3>
                    <p className="text-sm text-gray-600">
                      {file?.name} - {csvData.length} rows
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Map CSV Columns to Fields
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Match your CSV columns with the required fields
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={mappedFields.email}
                    onChange={(e) =>
                      setMappedFields({
                        ...mappedFields,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select column...</option>
                    {headers.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <select
                    value={mappedFields.firstName}
                    onChange={(e) =>
                      setMappedFields({
                        ...mappedFields,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select column...</option>
                    {headers.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <select
                    value={mappedFields.lastName}
                    onChange={(e) =>
                      setMappedFields({
                        ...mappedFields,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select column...</option>
                    {headers.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <select
                    value={mappedFields.name}
                    onChange={(e) =>
                      setMappedFields({ ...mappedFields, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select column...</option>
                    {headers.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Preview (First 3 Rows)
                </h4>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          {headers.map((header) => (
                            <th
                              key={header}
                              className="px-4 py-3 text-left font-semibold text-gray-700"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {csvData.slice(0, 3).map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            {headers.map((header) => (
                              <td
                                key={header}
                                className="px-4 py-3 text-gray-600"
                              >
                                {row[header]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {validationErrors.length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-red-600 mt-0.5" size={20} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-900 mb-2">
                        Validation Errors
                      </h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>• {error.message}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={validateData}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Continue to Review
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Select Email Template
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template._id}
                    onClick={() => setSelectedTemplate(template._id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      selectedTemplate === template._id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Mail
                        className={
                          selectedTemplate === template._id
                            ? "text-blue-600"
                            : "text-gray-400"
                        }
                        size={20}
                      />
                      {selectedTemplate === template._id && (
                        <CheckCircle className="text-blue-600" size={20} />
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {template.name}
                    </h4>
                    <p className="text-sm text-gray-600">{template.subject}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Review Recipients
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedUsers.length} of {csvData.length} users selected
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedUsers(csvData.map((u) => u.id))}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-semibold"
                    >
                      Select All
                    </button>
                    <button
                      onClick={() => setSelectedUsers([])}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-semibold"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === csvData.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(csvData.map((u) => u.id));
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                          className="rounded"
                        />
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {getTransformedData().map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([...selectedUsers, user.id]);
                              } else {
                                setSelectedUsers(
                                  selectedUsers.filter((id) => id !== user.id)
                                );
                              }
                            }}
                            className="rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-gray-800">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {user.firstName} {user.lastName || user.name}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Valid
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Ready to send?
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedUsers.length} emails will be sent using the
                    selected template
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSendEmails}
                    disabled={
                      !selectedTemplate ||
                      selectedUsers.length === 0 ||
                      isSending
                    }
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send size={18} />
                    {isSending
                      ? "Sending..."
                      : `Send ${selectedUsers.length} Emails`}
                  </button>
                </div>
              </div>

              {isSending && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Sending Progress
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {Math.round(sendProgress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${sendProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header Section */}
              {responseData && (
                <div
                  className={`p-12 text-center ${
                    responseData.success
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${
                      responseData.success ? "bg-white" : "bg-red-700"
                    }`}
                  >
                    {responseData.success ? (
                      <CheckCircle className="text-green-500" size={56} />
                    ) : (
                      <XCircle className="text-white" size={56} />
                    )}
                  </div>

                  <h2 className="text-4xl font-bold mb-3">
                    {responseData.success
                      ? "Emails Sent Successfully!"
                      : "Failed to Send Emails"}
                  </h2>

                  <p
                    className={`text-lg ${
                      responseData.success ? "text-green-50" : "text-white"
                    }`}
                  >
                    {responseData.success
                      ? responseData.message
                      : responseData.error}
                  </p>
                </div>
              )}

              {/* Stats Section */}
              <div className="p-8">
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
                    <p className="text-4xl font-bold text-blue-600 mb-2">
                      {responseData?.data?.total}
                    </p>
                    <p className="text-sm font-medium text-blue-700">
                      Total Sent
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm">
                    <p className="text-4xl font-bold text-green-600 mb-2">
                      {responseData?.data?.successful}
                    </p>
                    <p className="text-sm font-medium text-green-700">
                      Successful
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-4xl font-bold text-gray-600 mb-2">
                      {responseData?.data?.failed}
                    </p>
                    <p className="text-sm font-medium text-gray-700">Failed</p>
                  </div>
                </div>

                {/* Toggle Details Button */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    {showDetails ? "Hide" : "View"} Email Details
                  </button>
                </div>

                {/* Detailed Results */}
                {showDetails && (
                  <div className="mb-8 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Individual Results
                    </h3>
                    {responseData?.data?.results.map((result, index) => (
                      <div
                        key={result?.historyId}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div
                              className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center ${
                                result?.success ? "bg-green-100" : "bg-red-100"
                              }`}
                            >
                              {result.success ? (
                                <CheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                              ) : (
                                <XCircle className="text-red-600" size={20} />
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <User size={16} className="text-gray-400" />
                                <h4 className="font-semibold text-gray-800">
                                  {result.userId.firstName}{" "}
                                  {result.userId.lastName}
                                </h4>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                  {result.userId.role}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <Mail size={14} className="text-gray-400" />
                                <span>{result.email}</span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock size={12} className="text-gray-400" />
                                <span>
                                  Created: {formatDate(result.userId.createdAt)}
                                </span>
                              </div>

                              <div className="mt-2 text-xs text-gray-400 font-mono">
                                History ID: {result.historyId}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              result.success
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {result.success ? "Sent" : "Failed"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center pt-4">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700 transition-colors"
                  >
                    Import More Users
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg shadow-blue-200 transition-all"
                  >
                    View Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
