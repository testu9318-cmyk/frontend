import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, CheckCircle, XCircle, Loader, Pause, ChevronDown, ChevronRight, Trash2, Play, AlertCircle, PlayCircle, PauseCircle } from 'lucide-react';

export default function QueueMonitor() {
  const [queueStats, setQueueStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('delayed');
  const [expandedJobs, setExpandedJobs] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const API_URL = 'http://localhost:5000/api/queue';

  useEffect(() => {
    fetchQueueStats();
    const interval = autoRefresh ? setInterval(fetchQueueStats, 5000) : null;
    return () => interval && clearInterval(interval);
  }, [autoRefresh]);

  useEffect(() => {
    if (selectedStatus) {
      fetchJobs(selectedStatus);
    }
  }, [selectedStatus]);

  const fetchQueueStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      const result = await response.json();
      if (result.success) {
        setQueueStats(result.data);
      }
    } catch (error) {
      console.error('Error fetching queue stats:', error);
    }
  };

  const fetchJobs = async (status) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/jobs/${status}?start=0&end=100`);
      const result = await response.json();
      if (result.success) {
        setJobs(result.data.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  const toggleJobExpand = (jobId) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
    }
    setExpandedJobs(newExpanded);
  };

  const retryJob = async (jobId) => {
    try {
      const response = await fetch(`${API_URL}/job/${jobId}/retry`, { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        fetchJobs(selectedStatus);
        fetchQueueStats();
      }
    } catch (error) {
      console.error('Error retrying job:', error);
    }
  };

  const removeJob = async (jobId) => {
    if (!confirm('Are you sure you want to remove this job?')) return;
    try {
      const response = await fetch(`${API_URL}/job/${jobId}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) {
        fetchJobs(selectedStatus);
        fetchQueueStats();
      }
    } catch (error) {
      console.error('Error removing job:', error);
    }
  };

  const pauseQueue = async () => {
    try {
      const response = await fetch(`${API_URL}/pause`, { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        setIsPaused(true);
      }
    } catch (error) {
      console.error('Error pausing queue:', error);
    }
  };

  const resumeQueue = async () => {
    try {
      const response = await fetch(`${API_URL}/resume`, { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        setIsPaused(false);
      }
    } catch (error) {
      console.error('Error resuming queue:', error);
    }
  };

  const cleanQueue = async () => {
    if (!confirm('Clean old completed and failed jobs? (older than 1 hour)')) return;
    try {
      const response = await fetch(`${API_URL}/clean?grace=3600000`, { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        fetchJobs(selectedStatus);
        fetchQueueStats();
        alert(`Cleaned ${result.data.completedRemoved} completed and ${result.data.failedRemoved} failed jobs`);
      }
    } catch (error) {
      console.error('Error cleaning queue:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'active':
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'waiting':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'delayed':
        return <Pause className="w-5 h-5 text-orange-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  const formatJSON = (obj) => {
    if (!obj) return 'null';
    return JSON.stringify(obj, null, 2);
  };

  if (!queueStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const statuses = [
    { name: 'delayed', count: queueStats.delayed, color: 'orange' },
    { name: 'waiting', count: queueStats.waiting, color: 'yellow' },
    { name: 'active', count: queueStats.active, color: 'blue' },
    { name: 'completed', count: queueStats.completed, color: 'green' },
    { name: 'failed', count: queueStats.failed, color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Email Queue Monitor</h1>
              <p className="text-gray-600 mt-1">Total Jobs: {queueStats.total}</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600">Auto-refresh (5s)</span>
              </label>
              
              {isPaused ? (
                <button
                  onClick={resumeQueue}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <PlayCircle className="w-4 h-4" />
                  Resume Queue
                </button>
              ) : (
                <button
                  onClick={pauseQueue}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  <PauseCircle className="w-4 h-4" />
                  Pause Queue
                </button>
              )}

              <button
                onClick={cleanQueue}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                <Trash2 className="w-4 h-4" />
                Clean Old
              </button>

              <button
                onClick={() => {
                  fetchQueueStats();
                  fetchJobs(selectedStatus);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statuses.map((status) => (
              <button
                key={status.name}
                onClick={() => setSelectedStatus(status.name)}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedStatus === status.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {status.name}
                  </span>
                  {getStatusIcon(status.name)}
                </div>
                <div className="text-2xl font-bold">{status.count}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
            {selectedStatus} Jobs ({jobs.length})
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No {selectedStatus} jobs found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  {/* Job Header */}
                  <div className="bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => toggleJobExpand(job.id)}
                          className="text-gray-600 hover:text-gray-800 transition"
                        >
                          {expandedJobs.has(job.id) ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>
                        {getStatusIcon(selectedStatus)}
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">
                            Job ID: {job.id}
                          </div>
                          {job.data?.to && (
                            <div className="text-sm text-gray-600">
                              To: {job.data.to}
                            </div>
                          )}
                          {job.data?.subject && (
                            <div className="text-sm text-gray-600">
                              Subject: {job.data.subject}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedStatus === 'failed' && (
                          <button
                            onClick={() => retryJob(job.id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center gap-1 transition"
                          >
                            <Play className="w-3 h-3" />
                            Retry
                          </button>
                        )}
                        <button
                          onClick={() => removeJob(job.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center gap-1 transition"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Job Details (Expanded) */}
                  {expandedJobs.has(job.id) && (
                    <div className="p-4 space-y-4 bg-gray-50">
                      {/* Timestamps */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs font-medium text-gray-600 mb-1">Created At</div>
                          <div className="text-sm text-gray-800">{formatDate(job.timestamp)}</div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-600 mb-1">Attempts</div>
                          <div className="text-sm text-gray-800">{job.attemptsMade || 0}</div>
                        </div>
                        {job.scheduledTime && (
                          <div>
                            <div className="text-xs font-medium text-orange-600 mb-1">⏰ Scheduled For</div>
                            <div className="text-sm font-semibold text-orange-800">{formatDate(job.scheduledTime)}</div>
                            {job.timeRemaining > 0 && (
                              <div className="text-xs text-orange-600 mt-1">
                                In {Math.floor(job.timeRemaining / 1000 / 60)} min {Math.floor((job.timeRemaining / 1000) % 60)} sec
                              </div>
                            )}
                          </div>
                        )}
                        {job.delay && (
                          <div>
                            <div className="text-xs font-medium text-gray-600 mb-1">Delay Duration</div>
                            <div className="text-sm text-gray-800">{Math.floor(job.delay / 1000 / 60)} minutes</div>
                          </div>
                        )}
                        {job.processedOn && (
                          <div>
                            <div className="text-xs font-medium text-gray-600 mb-1">Processed At</div>
                            <div className="text-sm text-gray-800">{formatDate(job.processedOn)}</div>
                          </div>
                        )}
                        {job.finishedOn && (
                          <div>
                            <div className="text-xs font-medium text-gray-600 mb-1">Finished At</div>
                            <div className="text-sm text-gray-800">{formatDate(job.finishedOn)}</div>
                          </div>
                        )}
                      </div>

                      {/* Job Data */}
                      {job.data && (
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Job Data</span>
                          </div>
                          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                            {formatJSON(job.data)}
                          </pre>
                        </div>
                      )}

                      {/* Options */}
                      {job.opts && Object.keys(job.opts).length > 0 && (
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">Options</span>
                          </div>
                          <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                            {formatJSON(job.opts)}
                          </pre>
                        </div>
                      )}

                      {/* Progress */}
                      {job.progress !== undefined && job.progress !== null && (
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">Progress</div>
                          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div 
                              className="bg-blue-500 h-full transition-all duration-300"
                              style={{ width: `${job.progress}%` }}
                            >
                              <span className="text-xs text-white px-2">{job.progress}%</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Failed Reason */}
                      {job.failedReason && (
                        <div>
                          <div className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            Failed Reason
                          </div>
                          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-800">
                            {job.failedReason}
                          </div>
                        </div>
                      )}

                      {/* Stack Trace */}
                      {job.stacktrace && job.stacktrace.length > 0 && (
                        <div>
                          <div className="text-sm font-semibold text-red-600 mb-2">Stack Trace</div>
                          <pre className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-xs overflow-x-auto text-red-800 font-mono">
                            {job.stacktrace.join('\n')}
                          </pre>
                        </div>
                      )}

                      {/* Return Value */}
                      {job.returnvalue && (
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Return Value
                          </div>
                          <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                            {formatJSON(job.returnvalue)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}