import { Search, Plus, Eye, Edit2, Copy, Trash2 } from "lucide-react";
import { useTemplates } from "../hooks/useTemplates";
import ModalComan from "./ModalComan";
import { useState } from "react";
import { XCircle } from "lucide-react";   
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Required for accessibility


const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "0",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    maxWidth: "90vw",
    maxHeight: "90vh",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    zIndex: 1000,  // Added zIndex here (adjust the value as needed)
  },
};


function Templates() {
    const { data: templatesData } = useTemplates();
    console.log('templatesData', templatesData)
     const [modalIsOpen, setIsOpen] = useState(false);
    console.log('modalIsOpen', modalIsOpen)
      function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
      }
    
      function closeModal() {
        setIsOpen(false);
      }
  return (
    <div className="space-y-4">
      {/* Templates Toolbar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Onboarding</option>
              <option>Follow-up</option>
              <option>Newsletter</option>
            </select>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            New Template
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templatesData?.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{template.subject}</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  {template.roundId.name}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 mb-4  flex flex-row-reverse">
              <div className="flex text-sm justify-between gap-2.5   text-gray-600 mb-1">
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

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 border rounded hover:bg-gray-50 flex items-center justify-center gap-2 text-sm" >
                <Eye size={16} />
                Preview
              </button>
              <button className="flex-1 px-3 py-2 border rounded hover:bg-gray-50 flex items-center justify-center gap-2 text-sm">
                <Edit2 size={16} />
                Edit
              </button>
              <button className="px-3 py-2 border rounded hover:bg-gray-50 flex items-center justify-center">
                <Copy size={16} />
              </button>
              <button className="px-3 py-2 border border-red-200 rounded hover:bg-red-50 text-red-600 flex items-center justify-center">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

{
   <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="p-8 border-b flex justify-between items-center gap-6">
              <h2 className="text-2xl font-bold">Create Email Template</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={22} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Welcome Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Onboarding</option>
                  <option>Follow-up</option>
                  <option>Newsletter</option>
                  <option>Promotional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  placeholder="Welcome to our platform, {{firstName}}!"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available variables: {"{{firstName}}"}, {"{{email}}"},{" "}
                  {"{{name}}"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Content
                </label>
                <textarea
                  rows={10}
                  placeholder="Hi {{firstName}},

Welcome to our platform! We're excited to have you here.

Best regards,
The Team"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Template
              </button>
            </div>
      
      </Modal>
}
    </div>
  );
  
}

export default Templates