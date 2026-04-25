'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Mentor } from './MentorGridCard';

interface AddMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mentor: Mentor) => void;
}

const expertiseOptions = ['Growth', 'Product', 'Fundraising', 'Tech', 'Marketing', 'Legal'];
const statusOptions = ['Available Now', 'Scheduled', 'Busy', 'Offline'];

export default function AddMentorModal({ isOpen, onClose, onSubmit }: AddMentorModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    avatar: '👤',
    bio: '',
    expertise: [] as string[],
    status: 'Available Now',
    rating: 4.5,
    reviewCount: 0,
    sessionRate: '$200/hr',
    notableStartups: [] as string[],
    fullBio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpertiseToggle = (expertise: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter((e) => e !== expertise)
        : [...prev.expertise, expertise],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.title.trim() || !formData.company.trim()) {
      alert('Please fill in name, title, and company');
      return;
    }

    if (formData.expertise.length === 0) {
      alert('Please select at least one area of expertise');
      return;
    }

    if (formData.bio.trim().length < 10) {
      alert('Bio must be at least 10 characters');
      return;
    }

    // Create new mentor
    const newMentor: Mentor = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      title: formData.title.trim(),
      company: formData.company.trim(),
      avatar: formData.avatar,
      bio: formData.bio.trim(),
      expertise: formData.expertise,
      status: formData.status as any,
      rating: formData.rating,
      reviewCount: formData.reviewCount,
      sessionRate: formData.sessionRate,
      notableStartups: formData.notableStartups,
      fullBio: formData.fullBio || formData.bio,
      reviews: [],
      isConnected: false,
    };

    onSubmit(newMentor);

    // Reset form
    setFormData({
      name: '',
      title: '',
      company: '',
      avatar: '👤',
      bio: '',
      expertise: [],
      status: 'Available Now',
      rating: 4.5,
      reviewCount: 0,
      sessionRate: '$200/hr',
      notableStartups: [],
      fullBio: '',
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/20 z-40" aria-hidden="true" />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-lg z-50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Add New Mentor</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Alex Sterling"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Product Strategy Lead"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Company *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Notion"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Avatar Emoji
            </label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="👤"
              maxLength={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Short Bio *
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="e.g., Helped scale Notion to 100M+ users"
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
              Areas of Expertise *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {expertiseOptions.map((exp) => (
                <label key={exp} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.expertise.includes(exp)}
                    onChange={() => handleExpertiseToggle(exp)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{exp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Availability Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Session Rate */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Session Rate
            </label>
            <input
              type="text"
              name="sessionRate"
              value={formData.sessionRate}
              onChange={handleChange}
              placeholder="e.g., $250/hr"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              Add Mentor
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
