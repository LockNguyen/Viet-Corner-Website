'use client';

import { useState } from 'react';
import Image from 'next/image';
import { eventService } from '@/services/eventService';
import { useEventForm } from '@/hooks/useEventForm';
import type { EventEntity } from '@/types/event.types';
import ImageSelector from '../shared/ImageSelector';

interface EventFormProps {
  event?: EventEntity | null;
  mode: 'create' | 'edit';
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EventForm({ event, mode, onSuccess, onCancel }: EventFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validateForm,
    resetForm,
  } = useEventForm(event);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showThumbnailGallery, setShowThumbnailGallery] = useState(false);
  const [showHeroGallery, setShowHeroGallery] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const eventData = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        heroImageUrl: formData.heroImageUrl || null,
        thumbnailImageUrl: formData.thumbnailImageUrl || null,
        location: formData.location || null,
        notes: formData.notes || null,
        startDateTime: formData.startDateTime ? new Date(formData.startDateTime) : null,
        endDateTime: formData.endDateTime ? new Date(formData.endDateTime) : null,
        isActive: formData.isActive,
        recurring: formData.recurring,
      };

      if (mode === 'create') {
        await eventService.createEvent(eventData);
      } else if (event) {
        await eventService.updateEvent(event.id, eventData);
      }

      setSubmitSuccess(true);
      resetForm();
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to save event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-3">
          {mode === 'create' ? 'Create New Event' : 'Edit Event'}
        </h2>
        <button
          onClick={onCancel}
          type="button"
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close form"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Event saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter event title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Subtitle Field */}
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter event subtitle"
          />
        </div>

        {/* Location and Date Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Event location"
            />
          </div>
        </div>

        {/* Start and End DateTime */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDateTime" className="block text-sm font-medium text-gray-700 mb-2">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              id="startDateTime"
              value={formData.startDateTime}
              onChange={(e) => handleChange('startDateTime', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="endDateTime" className="block text-sm font-medium text-gray-700 mb-2">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              id="endDateTime"
              value={formData.endDateTime}
              onChange={(e) => handleChange('endDateTime', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.endDateTime ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.endDateTime && <p className="mt-1 text-sm text-red-600">{errors.endDateTime}</p>}
          </div>
        </div>

        {/* Thumbnail Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail Image
          </label>
          
          {!showThumbnailGallery ? (
            <div>
              <button
                type="button"
                onClick={() => setShowThumbnailGallery(true)}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors text-gray-600 hover:text-blue-600"
              >
                {formData.thumbnailImageUrl ? 'Change Thumbnail Image' : 'Select Thumbnail Image'}
              </button>
              
              {formData.thumbnailImageUrl && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={formData.thumbnailImageUrl}
                      alt="Selected thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Select Thumbnail</h3>
                <button
                  type="button"
                  onClick={() => setShowThumbnailGallery(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
              <ImageSelector
                value={formData.thumbnailImageUrl || null}
                onChange={(url) => handleChange('thumbnailImageUrl', url)}
                label="Thumbnail Image"
              />
            </div>
          )}
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Image
          </label>
          
          {!showHeroGallery ? (
            <div>
              <button
                type="button"
                onClick={() => setShowHeroGallery(true)}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors text-gray-600 hover:text-blue-600"
              >
                {formData.heroImageUrl ? 'Change Hero Image' : 'Select Hero Image'}
              </button>
              
              {formData.heroImageUrl && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={formData.heroImageUrl}
                      alt="Selected hero"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Select Hero Image</h3>
                <button
                  type="button"
                  onClick={() => setShowHeroGallery(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
              <ImageSelector
                value={formData.heroImageUrl || null}
                onChange={(url) => handleChange('heroImageUrl', url)}
                label="Hero Image"
              />
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Event description and additional notes..."
          />
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => handleChange('isActive', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Event is active and visible to users
          </label>
        </div>

        {/* Recurring Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="recurring"
            checked={formData.recurring}
            onChange={(e) => handleChange('recurring', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="recurring" className="ml-2 flex items-center gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Recurring event (repeats weekly)
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Event' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}