/* eslint-disable */
/**
 * This file was automatically generated from discipleship-class.schema.json
 * DO NOT MODIFY IT BY HAND. Run 'npm run generate:types' to regenerate.
 */

/**
 * A specific class session within a discipleship course at a location
 */
export interface DiscipleshipClass {
  /**
   * Unique identifier for the class
   */
  id: string;
  /**
   * Reference to the parent course
   */
  courseId: string;
  /**
   * Reference to the location where the class is held
   */
  locationId: string;
  /**
   * Start time of the class in ISO 8601 format
   */
  startTime: string;
  /**
   * End time of the class in ISO 8601 format
   */
  endTime: string;
  /**
   * Optional contact information for the class
   */
  contact?: string | null;
  /**
   * Optional scripture passage for the class
   */
  passage?: string | null;
}
