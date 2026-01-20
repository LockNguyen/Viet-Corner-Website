/* eslint-disable */
/**
 * This file was automatically generated from discipleship-location.schema.json
 * DO NOT MODIFY IT BY HAND. Run 'npm run generate:types' to regenerate.
 */

/**
 * A location where a discipleship course is offered
 */
export interface DiscipleshipLocation {
  /**
   * Unique identifier for the location
   */
  id: string;
  /**
   * Reference to the parent course
   */
  courseId: string;
  /**
   * Name of the location
   */
  name: string;
  /**
   * Optional thumbnail image URL for the location
   */
  thumbnailImageUrl?: string | null;
}
