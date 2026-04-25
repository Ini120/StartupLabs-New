'use client';

import { X, CheckCircle2, FileText, MessageCircle, Paperclip } from 'lucide-react';
import { Milestone } from './MilestoneItem';

interface MilestoneDetailPanelProps {
  milestone: Milestone | null;
  onClose: () => void;
  onStatusChange?: (milestoneId: string, newStatus: string) => void;
}

const statusColors: Record<string, string> = {
  Completed: 'bg-green-100 text-green-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Pending: 'bg-gray-100 text-gray-700',
  Overdue: 'bg-red-100 text-red-700',
};

export default function MilestoneDetailPanel({
  milestone,
  onClose,
  onStatusChange,
}: MilestoneDetailPanelProps) {
  if (!milestone) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-40"
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto border-l border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-lg text-gray-900 flex-1 truncate">{milestone.title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Status</p>
              <select
                value={milestone.status}
                onChange={(e) => onStatusChange?.(milestone.id, e.target.value)}
                className={`w-full px-2 py-1.5 rounded-lg text-xs font-medium border border-gray-300 cursor-pointer ${statusColors[milestone.status]}`}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Priority</p>
              <div className="text-xs font-medium px-2 py-1.5 rounded-lg bg-gray-100 text-gray-700">
                {milestone.priority}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed">{milestone.description}</p>
          </div>

          {/* Checklist Sub-tasks */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} className="text-gray-600" />
              <p className="text-xs font-semibold text-gray-600 uppercase">Checklist</p>
            </div>
            <div className="space-y-2 bg-gray-50 rounded-lg p-3">
              {milestone.checklist.length > 0 ? (
                milestone.checklist.map((task) => (
                  <label key={task.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      readOnly
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                    />
                    <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.title}
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-500">No checklist items</p>
              )}
            </div>
          </div>

          {/* Comments */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={16} className="text-gray-600" />
              <p className="text-xs font-semibold text-gray-600 uppercase">Comments</p>
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {milestone.comments.length > 0 ? (
                milestone.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <p className="text-xs font-semibold text-gray-900">{comment.author}</p>
                        <p className="text-xs text-gray-500">{comment.timestamp}</p>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No comments yet</p>
              )}
            </div>
          </div>

          {/* Attachments */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Paperclip size={16} className="text-gray-600" />
              <p className="text-xs font-semibold text-gray-600 uppercase">Attachments</p>
            </div>
            <div className="space-y-2">
              {milestone.attachments.length > 0 ? (
                milestone.attachments.map((file) => (
                  <div key={file.id} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0" aria-label="Download">
                      <FileText size={16} className="text-gray-600" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No attachments</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
              Edit Milestone
            </button>
            <button className="w-full px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
