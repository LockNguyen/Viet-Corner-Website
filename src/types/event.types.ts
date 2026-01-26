/**
 * Event type extensions
 * 
 * The base Event type is generated from schemas/event.schema.json.
 * This file contains:
 * - EventEntity: Event with Date objects instead of ISO strings (for runtime use)
 * - Form and filter types not defined in schemas
 */

import type { Event } from './generated';

/**
 * EventEntity extends the generated Event type with Date objects for date fields.
 * Use this type when working with Firestore data that has been converted from Timestamps.
 */
export interface EventEntity extends Omit<Event, 'startDateTime' | 'endDateTime'> {
  startDateTime?: Date | null;
  endDateTime?: Date | null;
}

export interface EventFormData {
  title: string;
  subtitle: string;
  heroImageUrl: string;
  thumbnailImageUrl: string;
  location: string;
  notes: string;
  startDateTime: string;
  endDateTime: string;
  isActive: boolean;
  recurring: boolean;
}

export interface EventsFilter {
  search: string;
  status: 'all' | 'active' | 'inactive';
}
