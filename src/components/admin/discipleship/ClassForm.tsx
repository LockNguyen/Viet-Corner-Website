'use client';

import { useState, useEffect } from 'react';
import { discipleshipService } from '@/services/discipleshipService';
import { formatClassTime } from '@/utils/timeFormatter';
import type { DiscipleshipClass } from '@/types/discipleship.types';

interface ClassFormProps {
  courseId: string;
  locationId: string;
  classItem?: DiscipleshipClass | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ClassForm({ courseId, locationId, classItem, onSuccess, onCancel }: ClassFormProps) {
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    contact: '',
    passage: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (classItem) {
      setFormData({
        startTime: new Date(classItem.startTime).toISOString().slice(0, 16),
        endTime: new Date(classItem.endTime).toISOString().slice(0, 16),
        contact: classItem.contact || '',
        passage: classItem.passage || '',
      });
    }
  }, [classItem]);

  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      try {
        const start = new Date(formData.startTime);
        const end = new Date(formData.endTime);
        setPreview(formatClassTime(start, end));
      } catch {
        setPreview('');
      }
    }
  }, [formData.startTime, formData.endTime]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);
      if (end <= start) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const classData = {
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
        contact: formData.contact || null,
        passage: formData.passage || null,
      };

      if (classItem) {
        await discipleshipService.updateClass(courseId, locationId, classItem.id, classData);
      } else {
        await discipleshipService.createClass(courseId, locationId, classData);
      }
      onSuccess();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to save class');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onCancel} />
      
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {classItem ? 'Edit Class' : 'Add New Class'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
            <p className="font-medium mb-1">Note: Classes recur weekly</p>
            <p>Only the day of the week and time matter. The specific date will be used to determine the weekday.</p>
          </div>

          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="startTime"
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.startTime ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="endTime"
              value={formData.endTime}
              onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.endTime ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
          </div>

          {preview && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700">
                <strong>Preview:</strong> {preview}
              </p>
            </div>
          )}

          <div>
            <label htmlFor="passage" className="block text-sm font-medium text-gray-700 mb-2">
              Bible Passage
            </label>
            <input
              type="text"
              id="passage"
              value={formData.passage}
              onChange={(e) => setFormData(prev => ({ ...prev, passage: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., John 3:16-21"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Phone or email"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting ? 'Saving...' : classItem ? 'Save Changes' : 'Create Class'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}