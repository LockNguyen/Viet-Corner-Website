/**
 * Discipleship type extensions
 * 
 * The base types are generated from schemas/discipleship-*.schema.json files.
 * 
 * This file contains:
 * - Re-exports of DiscipleshipCourse and DiscipleshipLocation (no changes needed)
 * - DiscipleshipClass: Extended with Date objects for runtime use (replaces string dates)
 * - DiscipleshipClassEntity: Alias for the Date-based class type
 * - Form data types not defined in schemas
 */

import type { 
  DiscipleshipCourse as GeneratedCourse, 
  DiscipleshipLocation as GeneratedLocation,
  DiscipleshipClass as GeneratedClass 
} from './generated';

// Re-export unchanged types from generated
export type { GeneratedCourse as DiscipleshipCourse };
export type { GeneratedLocation as DiscipleshipLocation };

/**
 * DiscipleshipClass with Date objects for time fields.
 * Use this type when working with Firestore data that has been converted from Timestamps.
 * This maintains backward compatibility with existing code that expects Date objects.
 */
export interface DiscipleshipClass extends Omit<GeneratedClass, 'startTime' | 'endTime'> {
  startTime: Date;
  endTime: Date;
}

/**
 * Alias for DiscipleshipClass - use for explicit clarity when working with entity data.
 */
export type DiscipleshipClassEntity = DiscipleshipClass;

export interface DiscipleshipFormData {
  name: string;
  description?: string;
}

export interface LocationFormData {
  name: string;
  thumbnailImageUrl?: string;
}

export interface ClassFormData {
  startTime: string;
  endTime: string;
  contact?: string;
  passage?: string;
}
