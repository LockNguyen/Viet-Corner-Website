/**
 * Type exports
 * 
 * This file consolidates all type exports from generated and manual type definitions.
 * Generated types come from JSON schemas via `npm run generate:types`.
 * Manual types contain form data, filter types, and runtime entity types with Date objects.
 */

// Re-export generated base types (use these for JSON/API boundaries)
export type { Event } from './generated';

// Re-export Event extension with Date objects (use for runtime/Firestore)
export type {
  EventEntity,
  EventFormData,
  EventsFilter,
} from './event.types';

// Re-export Discipleship types (Course/Location from generated, Class with Date extension)
export type {
  DiscipleshipCourse,
  DiscipleshipLocation,
  DiscipleshipClass,
  DiscipleshipClassEntity,
  DiscipleshipFormData,
  LocationFormData,
  ClassFormData,
} from './discipleship.types';
