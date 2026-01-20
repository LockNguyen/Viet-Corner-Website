/* eslint-disable */
/**
 * This file was automatically generated from event.schema.json
 * DO NOT MODIFY IT BY HAND. Run 'npm run generate:types' to regenerate.
 */

/**
 * An event entity representing a church event
 */
export interface Event {
  /**
   * Unique identifier for the event
   */
  id: string;
  /**
   * Event title
   */
  title: string;
  /**
   * Optional subtitle for the event
   */
  subtitle?: string | null;
  /**
   * Auto-generated display string for the event date (read-only)
   */
  dateDisplay?: string | null;
  /**
   * URL for the hero/banner image
   */
  heroImageUrl?: string | null;
  /**
   * URL for the thumbnail image
   */
  thumbnailImageUrl?: string | null;
  /**
   * Event location
   */
  location?: string | null;
  /**
   * Additional notes about the event
   */
  notes?: string | null;
  /**
   * Event start date and time in ISO 8601 format
   */
  startDateTime?: string | null;
  /**
   * Event end date and time in ISO 8601 format
   */
  endDateTime?: string | null;
  /**
   * Whether the event is currently active
   */
  isActive: boolean;
  /**
   * Whether the event is recurring
   */
  recurring: boolean;
  /**
   * Display order for the event
   */
  order: number;
}
