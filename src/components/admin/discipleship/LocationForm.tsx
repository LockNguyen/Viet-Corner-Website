'use client';

import { useState, useEffect } from 'react';
import { discipleshipService } from '@/services/discipleshipService';
import ImageSelector from '../shared/ImageSelector';
import type { DiscipleshipLocation } from '@/types/discipleship.types';

interface LocationFormProps {
  courseId: string;
  location?: DiscipleshipLocation | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function LocationForm({ courseId, location, onSuccess, onCancel }: LocationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    thumbnailImageUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name,
        thumbnailImageUrl: location.thumbnailImageUrl || '',
      });
    }
  }, [location]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Location name is required';
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
      const locationData = {
        name: formData.name,
        thumbnailImageUrl: formData.thumbnailImageUrl || null,
      };

      if (location) {
        await discipleshipService.updateLocation(courseId, location.id, locationData);
      } else {
        await discipleshipService.createLocation(courseId, locationData);
      }
      onSuccess();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to save location');
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
            {location ? 'Edit Location' : 'Add New Location'}
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
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Location Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Wake Forest University"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <ImageSelector
            value={formData.thumbnailImageUrl}
            onChange={(url) => setFormData(prev => ({ ...prev, thumbnailImageUrl: url }))}
            label="Thumbnail Image"
          />

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting ? 'Saving...' : location ? 'Save Changes' : 'Create Location'}
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