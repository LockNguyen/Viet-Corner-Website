'use client';

import { useState, useEffect } from 'react';
import type { EventEntity, EventFormData } from '@/types/event.types';

interface ValidationErrors {
  [key: string]: string;
}

export function useEventForm(initialEvent?: EventEntity | null) {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    subtitle: '',
    heroImageUrl: '',
    thumbnailImageUrl: '',
    location: '',
    notes: '',
    startDateTime: '',
    endDateTime: '',
    isActive: true,
    recurring: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialEvent) {
      setFormData({
        title: initialEvent.title,
        subtitle: initialEvent.subtitle || '',
        heroImageUrl: initialEvent.heroImageUrl || '',
        thumbnailImageUrl: initialEvent.thumbnailImageUrl || '',
        location: initialEvent.location || '',
        notes: initialEvent.notes || '',
        startDateTime: initialEvent.startDateTime 
          ? new Date(initialEvent.startDateTime).toISOString().slice(0, 16) 
          : '',
        endDateTime: initialEvent.endDateTime 
          ? new Date(initialEvent.endDateTime).toISOString().slice(0, 16) 
          : '',
        isActive: initialEvent.isActive,
        recurring: initialEvent.recurring,
      });
    }
  }, [initialEvent]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.heroImageUrl && !isValidUrl(formData.heroImageUrl)) {
      newErrors.heroImageUrl = 'Please enter a valid URL';
    }

    if (formData.thumbnailImageUrl && !isValidUrl(formData.thumbnailImageUrl)) {
      newErrors.thumbnailImageUrl = 'Please enter a valid URL';
    }

    if (formData.startDateTime && formData.endDateTime) {
      const start = new Date(formData.startDateTime);
      const end = new Date(formData.endDateTime);
      if (end < start) {
        newErrors.endDateTime = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (
    field: keyof EventFormData,
    value: string | boolean
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      heroImageUrl: '',
      thumbnailImageUrl: '',
      location: '',
      notes: '',
      startDateTime: '',
      endDateTime: '',
      isActive: true,
      recurring: false,
    });
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validateForm,
    resetForm,
  };
}