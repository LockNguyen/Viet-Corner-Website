/* eslint-disable */
/**
 * This file was automatically generated from discipleship-course.schema.json
 * DO NOT MODIFY IT BY HAND. Run 'npm run generate:types' to regenerate.
 */

/**
 * A discipleship course offered by the church
 */
export interface DiscipleshipCourse {
  /**
   * Unique identifier for the course
   */
  id: string;
  /**
   * Name of the course
   */
  name: string;
  /**
   * Optional description of the course
   */
  description?: string | null;
}
