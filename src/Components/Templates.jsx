import { Search, Plus, Eye, Edit2, Copy, Trash2, CheckCircle } from "lucide-react";
import { useCreateTemplate, useDeleteTemplate, useTemplates, useUpdateTemplate } from "../hooks/useTemplates";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";   
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import PreviewTemplates from "./PreviewTemplates";


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
    zIndex: 1000,  // Added zIndex here (adjust the value as needed)
  },
   overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 999, // must be below content
  },
};


function Templates() {
    const { data: templatesData } = useTemplates();
    const [modalIsOpen, setIsOpen] = useState(false);
    const createTemplate = useCreateTemplate();
    const [copiedId, setCopiedId] = useState(null);
    const [showPrev,setShowPrev]=useState(false);
    const [ PreviewTemplatesData ,setPreviewTemplatesData ]=useState([]);

    const { mutate: updateTemplateMutate } = useUpdateTemplate();
    const { mutate: deleteTemplateMutate, isLoading } = useDeleteTemplate();


      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
      }
    
      function closeModal() {
        setIsOpen(false);
      }

      const { register, handleSubmit, reset } = useForm({
        defaultValues: {
          name: "",
          category: "Onboarding",
          subject: "",
          body: "",
          roundName: "Round 1",
        },
      });
      const [initialData, setInitialData] = useState(null); // null for create, or template data for edit
      useEffect(() => {
        if (initialData) {
          const roundName = initialData.roundId
            ? initialData.roundId.name.split(" - ")[0]
            : "";
          reset({
            name: initialData.name || "",
            category: initialData.category || "",
            subject: initialData.subject || "",
            body: initialData.body || "",
            roundName: roundName,
          });
        }
      }, [initialData, reset]);

      const onSubmit = (data) => {
        if (initialData?.roundId?._id) {
          // Edit mode
          updateTemplateMutate(
            {
              id: initialData._id,
              payload: {
                templateName: data.name,
                category: data.category,
                subject: data.subject,
                content: data.body,
                roundName: data.roundName,
              },
            },
            {
              onSuccess: () => {
                toast.success("Template updated!");
                setIsOpen(false);
              },
            }
          );
        } else {
          // Create mode
          createTemplate(data, {
            onSuccess: () => {
              toast.success("Template created!");
              setIsOpen(false);
            },
          });
        }
      };

      const submitHandler = (data) => {
        onSubmit(data);
        setIsOpen(false);
      };

      const OnEditTEmplates = (template) => {
        console.log("template", template);
        setInitialData(template);
        setIsOpen(true);
      };

      const handleCopy = async (text, id) => {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 5000);
      };
 const handleDelete = (id) => {
  deleteTemplateMutate(id, {
    onSuccess: () => {
      console.log("Template deleted successfully");
    },
  });
};
;

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
                  {template?.roundId?.name}
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
              <button className="flex-1  border rounded hover:bg-gray-50 flex items-center justify-center gap-2 text-sm" onClick={()=>{setShowPrev(true),setPreviewTemplatesData([template])}}>
                <Eye size={16} />
                Preview
              </button>
              <button
                className="flex-1 border rounded hover:bg-gray-50 flex items-center justify-center gap-2 text-sm"
                onClick={() => OnEditTEmplates(template)}
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                key={template._id}
                onClick={() => handleCopy(template.body, template._id)}
                className="flex items-center justify-center gap-2  px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                {copiedId === template._id ? (
                  <CheckCircle size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} />
                )}
                <span className="font-semibold">
                  {copiedId === template._id ? "Copied!" : "Copy"}
                </span>
              </button>
              <button className="px-3 py-2 border border-red-200 rounded hover:bg-red-50 text-red-600 flex items-center justify-center" onClick={()=> handleDelete(template._id)}>
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
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="p-8 border-b flex justify-between items-center gap-6">
              <h2 className="text-2xl font-bold">
                {initialData ? "Edit Email Template" : "Create Email Template"}
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={22} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Template Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Template Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Round{" "}
                </label>
                <select
                  {...register("roundName")}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="Round 1">Round 1</option>
                  <option value="Round 2">Round 2</option>
                  <option value="Round 3">Round 3</option>
                </select>
              </div>
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="Onboarding">Onboarding</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Newsletter">Newsletter</option>
                  <option value="Promotional">Promotional</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Subject Line
                </label>
                <input
                  {...register("subject", { required: true })}
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Content
                </label>
                <textarea
                  {...register("body", { required: true })}
                  rows={10}
                  className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {initialData ? "Update Template" : "Save Template"}
              </button>
            </div>
          </form>
        </Modal>
      }
      {
      showPrev && <PreviewTemplates PreviewTemplatesData={PreviewTemplatesData} setShowPrev={setShowPrev} OnEditTEmplates={OnEditTEmplates}/>
      }
    </div>
  );
  
}

export default Templates