import React, { useState } from 'react';
import { Mail, Clock, CheckCircle, Users, Play, ArrowRight, MoreVertical, Plus, Trash2, Edit, Save, GripVertical, Loader } from 'lucide-react';

export default function EmailWorkflowBuilder() {
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [editingStep, setEditingStep] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [workflowName, setWorkflowName] = useState('New Email Sequence');
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverStep, setDragOverStep] = useState(null);

  // Fetch templates from your API
  React.useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/templates');
      const data = await response.json();
      setTemplates(data.data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  // Drag from sidebar to canvas
  const handleDragStart = (e, stepType) => {
    setDraggedItem({ type: 'new', stepType });
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', stepType);
  };

  // Reorder existing steps
  const handleStepDragStart = (e, index) => {
    setDraggedItem({ type: 'reorder', index });
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only update if the index has changed to reduce re-renders
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e) => {
    e.stopPropagation();
    // Only clear if we're actually leaving the drop zone
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setDragOverIndex(null);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOverIndex(null);
    setDragOverStep(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(null);
    setIsDragging(false);

    if (!draggedItem) return;

    if (draggedItem.type === 'new') {
      // Adding new step from sidebar
      const newStep = createNewStep(draggedItem.stepType);
      const newSteps = [...workflowSteps];
      newSteps.splice(dropIndex, 0, newStep);
      setWorkflowSteps(newSteps);
    } else if (draggedItem.type === 'reorder') {
      // Reordering existing steps - improved logic
      if (draggedItem.index === dropIndex) {
        // Dropped in same position, no change needed
        setDraggedItem(null);
        return;
      }
      
      const newSteps = [...workflowSteps];
      const [movedStep] = newSteps.splice(draggedItem.index, 1);
      
      // Adjust drop index if moving down
      const adjustedDropIndex = draggedItem.index < dropIndex ? dropIndex - 1 : dropIndex;
      newSteps.splice(adjustedDropIndex, 0, movedStep);
      setWorkflowSteps(newSteps);
    }

    setDraggedItem(null);
  };

  const handleDropOnCanvas = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (draggedItem && draggedItem.type === 'new') {
      const newStep = createNewStep(draggedItem.stepType);
      setWorkflowSteps([...workflowSteps, newStep]);
    }
    
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const createNewStep = (stepType) => {
    return {
      id: Date.now(),
      type: stepType,
      title: stepType === 'email' ? 'New Email' : stepType === 'delay' ? 'Wait Time' : stepType === 'condition' ? 'New Condition' : 'Update Contact',
      templateId: null,
      templateName: 'Select Template',
      delay: stepType === 'delay' ? 1 : 0,
      delayUnit: 'days',
      condition: null
    };
  };

  const removeStep = (id) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== id));
  };

  const updateStep = (id, updates) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === id ? { ...step, ...updates } : step
    ));
    setEditingStep(null);
  };

  const saveWorkflow = async () => {
    setLoading(true);
    const workflow = {
      name: workflowName,
      steps: workflowSteps.map((step, index) => ({
        order: index,
        type: step.type,
        templateId: step.templateId,
        delay: step.delay,
        delayUnit: step.delayUnit,
        condition: step.condition
      }))
    };

    try {
      const response = await fetch('http://localhost:5000/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflow)
      });
      const result = await response.json();
      if (result.success) {
        alert('Workflow saved successfully!');
      }
    } catch (error) {
      console.error('Error saving workflow:', error);
      alert('Failed to save workflow');
    }
    setLoading(false);
  };

  const getStepIcon = (type) => {
    switch (type) {
      case 'email': return <Mail size={18} className="text-blue-600" />;
      case 'delay': return <Clock size={18} className="text-purple-600" />;
      case 'condition': return <CheckCircle size={18} className="text-green-600" />;
      case 'update': return <Users size={18} className="text-orange-600" />;
      default: return <Mail size={18} />;
    }
  };

  const getStepColor = (type) => {
    switch (type) {
      case 'email': return 'border-blue-500 bg-blue-50';
      case 'delay': return 'border-purple-500 bg-purple-50';
      case 'condition': return 'border-green-500 bg-green-50';
      case 'update': return 'border-orange-500 bg-orange-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const renderStepEditor = (step) => (
    <div className="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Step Title</label>
        <input
          type="text"
          value={step.title}
          onChange={(e) => updateStep(step.id, { title: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {step.type === 'email' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email Template</label>
          <select
            value={step.templateId || ''}
            onChange={(e) => {
              const template = templates.find(t => t._id === e.target.value);
              updateStep(step.id, { 
                templateId: e.target.value,
                templateName: template?.name || 'Select Template'
              });
            }}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Template</option>
            {templates.map(template => (
              <option key={template._id} value={template._id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {step.type === 'delay' && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Wait Time</label>
            <input
              type="number"
              min="1"
              value={step.delay}
              onChange={(e) => updateStep(step.id, { delay: parseInt(e.target.value) })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Unit</label>
            <select
              value={step.delayUnit}
              onChange={(e) => updateStep(step.id, { delayUnit: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>
        </div>
      )}

      {step.type === 'condition' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Condition Type</label>
          <select
            value={step.condition || ''}
            onChange={(e) => updateStep(step.id, { condition: e.target.value })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Condition</option>
            <option value="email_opened">Email Opened</option>
            <option value="link_clicked">Link Clicked</option>
            <option value="email_replied">Email Replied</option>
          </select>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setEditingStep(null)}
          className="flex-1 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => setEditingStep(null)}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  );

  const sidebarSteps = [
    { type: 'email', label: 'Send Email', icon: Mail, color: 'blue', desc: 'Send an email to recipient' },
    { type: 'delay', label: 'Wait/Delay', icon: Clock, color: 'purple', desc: 'Wait for specified time' },
    { type: 'condition', label: 'Condition', icon: CheckCircle, color: 'green', desc: 'Branch based on action' },
    { type: 'update', label: 'Update Contact', icon: Users, color: 'orange', desc: 'Modify contact properties' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="text-2xl font-bold text-gray-800 border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"
              />
              <p className="text-gray-600 mt-2">🎯 Drag steps from the sidebar to build your workflow</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={saveWorkflow}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                Save Workflow
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Workflow Steps Sidebar */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 h-fit shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              📦 Workflow Steps
            </h3>
            <p className="text-xs text-gray-600 mb-4">Drag these steps to your workflow canvas</p>
            <div className="space-y-3">
              {sidebarSteps.map((step) => (
                <div
                  key={step.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, step.type)}
                  onDragEnd={handleDragEnd}
                  className={`p-3 border-2 border-dashed rounded-lg cursor-grab active:cursor-grabbing text-left transition-all duration-200 ${
                    isDragging && draggedItem?.stepType === step.type
                      ? 'border-blue-400 bg-blue-50 opacity-50'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon size={18} className={`text-${step.color}-600`} />
                    <span className="text-sm font-semibold text-gray-800">{step.label}</span>
                    <GripVertical size={16} className="ml-auto text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-900 font-semibold mb-2">💡 Quick Guide:</p>
              <ul className="text-xs text-blue-800 space-y-1.5">
                <li className="flex items-start gap-1">
                  <span className="font-bold">•</span>
                  <span><strong>Drag</strong> steps from here to the canvas</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="font-bold">•</span>
                  <span><strong>Reorder</strong> by dragging existing steps</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="font-bold">•</span>
                  <span><strong>Click edit</strong> icon to configure</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Workflow Canvas */}
          <div className="col-span-3 bg-white rounded-lg border border-gray-200 p-6">
            <div 
              className="bg-gray-50 rounded-lg p-8 min-h-[600px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropOnCanvas}
            >
              <div className="max-w-2xl mx-auto space-y-4">
                {/* Start */}
                <div className="flex flex-col items-center">
                  <div className="w-48 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-4 text-center shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Play size={20} />
                      <span className="font-semibold">Workflow Start</span>
                    </div>
                    <p className="text-xs text-green-100">Triggered manually or by event</p>
                  </div>
                  {workflowSteps.length > 0 && (
                    <>
                      <div className="w-1 h-8 bg-gray-300"></div>
                      <ArrowRight className="text-gray-400 rotate-90" size={24} />
                    </>
                  )}
                </div>

                {/* Drop Zone at start */}
                {workflowSteps.length > 0 && (
                  <div
                    onDragOver={(e) => handleDragOver(e, 0)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 0)}
                    className={`rounded transition-all duration-200 flex items-center justify-center ${
                      dragOverIndex === 0 
                        ? 'bg-blue-100 border-2 border-dashed border-blue-500 h-16 my-2' 
                        : isDragging 
                          ? 'bg-blue-50 border-2 border-dashed border-blue-300 h-8 my-1 opacity-50'
                          : 'h-2 bg-transparent'
                    }`}
                  >
                    {dragOverIndex === 0 && (
                      <span className="text-xs font-semibold text-blue-600">
                        Drop here to insert at position 1
                      </span>
                    )}
                  </div>
                )}

                {/* Workflow Steps */}
                {workflowSteps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                      {editingStep === step.id ? (
                        renderStepEditor(step)
                      ) : (
                        <div
                          draggable={!editingStep}
                          onDragStart={(e) => handleStepDragStart(e, index)}
                          onDragEnd={handleDragEnd}
                          className={`w-72 bg-white border-2 ${getStepColor(step.type)} rounded-lg p-4 shadow-lg transition-all duration-200 ${
                            !editingStep ? 'cursor-move hover:shadow-2xl hover:scale-105' : 'cursor-default'
                          } ${
                            isDragging && draggedItem?.type === 'reorder' && draggedItem?.index === index 
                              ? 'opacity-30 scale-95' 
                              : 'opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 flex-1">
                              <div className="flex flex-col gap-0.5 cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded">
                                <GripVertical size={18} className="text-gray-500" />
                              </div>
                              {getStepIcon(step.type)}
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-800 text-sm">{step.title}</span>
                                <span className="text-xs text-gray-500">Step {index + 1}</span>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button 
                                onClick={() => setEditingStep(step.id)}
                                className="p-1.5 hover:bg-blue-100 rounded transition-colors"
                                title="Edit step"
                              >
                                <Edit size={14} className="text-blue-600" />
                              </button>
                              <button 
                                onClick={() => removeStep(step.id)}
                                className="p-1.5 hover:bg-red-100 rounded transition-colors"
                                title="Delete step"
                              >
                                <Trash2 size={14} className="text-red-500" />
                              </button>
                            </div>
                          </div>
                          
                          {step.type === 'email' && (
                            <div>
                              <p className="text-sm text-gray-600 mb-1">
                                📧 {step.templateName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {step.delay > 0 ? `⏰ After ${step.delay} ${step.delayUnit}` : '⚡ Send immediately'}
                              </p>
                            </div>
                          )}
                          
                          {step.type === 'delay' && (
                            <p className="text-sm text-gray-600">
                              ⏱️ Wait: {step.delay} {step.delayUnit}
                            </p>
                          )}
                          
                          {step.type === 'condition' && (
                            <p className="text-sm text-gray-600">
                              {step.condition ? `✓ ${step.condition.replace('_', ' ')}` : '⚙️ Configure condition'}
                            </p>
                          )}

                          {step.type === 'update' && (
                            <p className="text-sm text-gray-600">
                              👤 Update contact data
                            </p>
                          )}
                        </div>
                      )}
                      
                      {index < workflowSteps.length - 1 && (
                        <>
                          <div className="w-1 h-8 bg-gray-300"></div>
                          <ArrowRight className="text-gray-400 rotate-90" size={24} />
                        </>
                      )}
                    </div>

                    {/* Drop Zone between steps */}
                    <div
                      onDragOver={(e) => handleDragOver(e, index + 1)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index + 1)}
                      className={`rounded transition-all duration-200 flex items-center justify-center ${
                        dragOverIndex === index + 1 
                          ? 'bg-blue-100 border-2 border-dashed border-blue-500 h-16 my-2' 
                          : isDragging 
                            ? 'bg-blue-50 border-2 border-dashed border-blue-300 h-8 my-1 opacity-50'
                            : 'h-2 bg-transparent'
                      }`}
                    >
                      {dragOverIndex === index + 1 && (
                        <span className="text-xs font-semibold text-blue-600">
                          Drop here to insert at position {index + 2}
                        </span>
                      )}
                    </div>
                  </React.Fragment>
                ))}

                {/* Empty State */}
                {workflowSteps.length === 0 && (
                  <div className={`text-center py-16 border-2 border-dashed rounded-lg transition-all duration-200 ${
                    isDragging 
                      ? 'border-blue-400 bg-blue-50 scale-105' 
                      : 'border-gray-300 bg-gray-50'
                  }`}>
                    <Mail className={`w-20 h-20 mx-auto mb-4 transition-colors ${
                      isDragging ? 'text-blue-400' : 'text-gray-300'
                    }`} />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {isDragging ? 'Drop Here to Add Step' : 'Start Building Your Workflow'}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      {isDragging 
                        ? 'Release to add this step to your workflow' 
                        : 'Drag and drop workflow steps from the left sidebar to create your automated email sequence'}
                    </p>
                    <div className="flex items-center justify-center gap-3 text-blue-600">
                      <ArrowRight className="rotate-180 animate-pulse" size={24} />
                      <span className="text-sm font-semibold">Drag steps from the sidebar to begin</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}