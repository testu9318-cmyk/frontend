import React, { useState } from "react";
import Modal from "react-modal";
import { XCircle } from "lucide-react";   
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
function ModalComan({showTemplateEditor}) {
  const [modalIsOpen, setIsOpen] = useState(showTemplateEditor);

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
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Create Email Template</h2>
              <button
                onClick={() => setShowTemplateEditor(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} />
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
                onClick={() => setShowTemplateEditor(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Template
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComan;
