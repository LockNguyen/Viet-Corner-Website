import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import type { DiscipleshipCourse, DiscipleshipLocation, DiscipleshipClass } from '@/types/discipleship.types';

const COURSES_COLLECTION = 'discipleshipCourses';
const LOCATIONS_SUBCOLLECTION = 'discipleshipLocations';
const CLASSES_SUBCOLLECTION = 'discipleshipClasses';

export const discipleshipService = {
  // ==================== COURSE OPERATIONS ====================
  
  async getAllCourses(): Promise<DiscipleshipCourse[]> {
    try {
      const coursesRef = collection(db, COURSES_COLLECTION);
      const q = query(coursesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as DiscipleshipCourse[];
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error('Failed to fetch courses');
    }
  },

  async getCourseById(courseId: string): Promise<DiscipleshipCourse | null> {
    try {
      const courseRef = doc(db, COURSES_COLLECTION, courseId);
      const courseDoc = await getDoc(courseRef);
      
      if (!courseDoc.exists()) return null;
      
      return {
        id: courseDoc.id,
        ...courseDoc.data(),
        createdAt: courseDoc.data().createdAt?.toDate() || new Date(),
        updatedAt: courseDoc.data().updatedAt?.toDate() || new Date(),
      } as DiscipleshipCourse;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw new Error('Failed to fetch course');
    }
  },

  async createCourse(data: Partial<DiscipleshipCourse>): Promise<string> {
    try {
      const now = Timestamp.now();
      const coursesRef = collection(db, COURSES_COLLECTION);
      
      const courseData = {
        name: data.name,
        description: data.description || null,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(coursesRef, courseData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating course:', error);
      throw new Error('Failed to create course');
    }
  },

  async updateCourse(courseId: string, data: Partial<DiscipleshipCourse>): Promise<void> {
    try {
      const courseRef = doc(db, COURSES_COLLECTION, courseId);
      const updateData: any = {
        ...data,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(courseRef, updateData);
    } catch (error) {
      console.error('Error updating course:', error);
      throw new Error('Failed to update course');
    }
  },

  async deleteCourse(courseId: string): Promise<void> {
    try {
      // Delete all locations and their classes first
      const locations = await this.getLocationsByCourse(courseId);
      
      for (const location of locations) {
        await this.deleteLocation(courseId, location.id);
      }
      
      // Then delete the course
      const courseRef = doc(db, COURSES_COLLECTION, courseId);
      await deleteDoc(courseRef);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw new Error('Failed to delete course');
    }
  },

  // ==================== LOCATION OPERATIONS ====================
  
  async getLocationsByCourse(courseId: string): Promise<DiscipleshipLocation[]> {
    try {
      const locationsRef = collection(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION);
      const q = query(locationsRef, orderBy('createdAt', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        courseId,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as DiscipleshipLocation[];
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw new Error('Failed to fetch locations');
    }
  },

  async getLocationById(courseId: string, locationId: string): Promise<DiscipleshipLocation | null> {
    try {
      const locationRef = doc(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION, locationId);
      const locationDoc = await getDoc(locationRef);
      
      if (!locationDoc.exists()) return null;
      
      return {
        id: locationDoc.id,
        courseId,
        ...locationDoc.data(),
        createdAt: locationDoc.data().createdAt?.toDate() || new Date(),
        updatedAt: locationDoc.data().updatedAt?.toDate() || new Date(),
      } as DiscipleshipLocation;
    } catch (error) {
      console.error('Error fetching location:', error);
      throw new Error('Failed to fetch location');
    }
  },

  async createLocation(courseId: string, data: Partial<DiscipleshipLocation>): Promise<string> {
    try {
      const now = Timestamp.now();
      const locationsRef = collection(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION);
      
      const locationData = {
        name: data.name,
        thumbnailImageUrl: data.thumbnailImageUrl || null,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(locationsRef, locationData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating location:', error);
      throw new Error('Failed to create location');
    }
  },

  async updateLocation(courseId: string, locationId: string, data: Partial<DiscipleshipLocation>): Promise<void> {
    try {
      const locationRef = doc(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION, locationId);
      const updateData: any = {
        ...data,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(locationRef, updateData);
    } catch (error) {
      console.error('Error updating location:', error);
      throw new Error('Failed to update location');
    }
  },

  async deleteLocation(courseId: string, locationId: string): Promise<void> {
    try {
      // Delete all classes first
      const classes = await this.getClassesByLocation(courseId, locationId);
      const batch = writeBatch(db);
      
      classes.forEach(cls => {
        const classRef = doc(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION, locationId, CLASSES_SUBCOLLECTION, cls.id);
        batch.delete(classRef);
      });
      
      await batch.commit();
      
      // Then delete the location
      const locationRef = doc(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION, locationId);
      await deleteDoc(locationRef);
    } catch (error) {
      console.error('Error deleting location:', error);
      throw new Error('Failed to delete location');
    }
  },

  // ==================== CLASS OPERATIONS ====================
  
  async getClassesByLocation(courseId: string, locationId: string): Promise<DiscipleshipClass[]> {
    try {
      const classesRef = collection(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION, locationId, CLASSES_SUBCOLLECTION);
      const q = query(classesRef, orderBy('startTime', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        courseId,
        locationId,
        ...doc.data(),
        startTime: doc.data().startTime?.toDate() || new Date(),
        endTime: doc.data().endTime?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as DiscipleshipClass[];
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw new Error('Failed to fetch classes');
    }
  },

  async getClassById(courseId: string, locationId: string, classId: string): Promise<DiscipleshipClass | null> {
    try {
      const classRef = doc(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION, locationId, CLASSES_SUBCOLLECTION, classId);
      const classDoc = await getDoc(classRef);
      
      if (!classDoc.exists()) return null;
      
      return {
        id: classDoc.id,
        courseId,
        locationId,
        ...classDoc.data(),
        startTime: classDoc.data().startTime?.toDate() || new Date(),
        endTime: classDoc.data().endTime?.toDate() || new Date(),
        createdAt: classDoc.data().createdAt?.toDate() || new Date(),
        updatedAt: classDoc.data().updatedAt?.toDate() || new Date(),
      } as DiscipleshipClass;
    } catch (error) {
      console.error('Error fetching class:', error);
      throw new Error('Failed to fetch class');
    }
  },

  async createClass(courseId: string, locationId: string, data: Partial<DiscipleshipClass>): Promise<string> {
    try {
      const now = Timestamp.now();
      const classesRef = collection(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION, locationId, CLASSES_SUBCOLLECTION);
      
      const classData = {
        startTime: data.startTime ? Timestamp.fromDate(new Date(data.startTime)) : now,
        endTime: data.endTime ? Timestamp.fromDate(new Date(data.endTime)) : now,
        contact: data.contact || null,
        passage: data.passage || null,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(classesRef, classData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating class:', error);
      throw new Error('Failed to create class');
    }
  },

  async updateClass(courseId: string, locationId: string, classId: string, data: Partial<DiscipleshipClass>): Promise<void> {
    try {
      const classRef = doc(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION, locationId, CLASSES_SUBCOLLECTION, classId);
      const updateData: any = {
        ...data,
        updatedAt: Timestamp.now(),
      };

      if (data.startTime) {
        updateData.startTime = Timestamp.fromDate(new Date(data.startTime));
      }
      if (data.endTime) {
        updateData.endTime = Timestamp.fromDate(new Date(data.endTime));
      }

      await updateDoc(classRef, updateData);
    } catch (error) {
      console.error('Error updating class:', error);
      throw new Error('Failed to update class');
    }
  },

  async deleteClass(courseId: string, locationId: string, classId: string): Promise<void> {
    try {
      const classRef = doc(db, COURSES_COLLECTION, courseId, LOCATIONS_SUBCOLLECTION, locationId, CLASSES_SUBCOLLECTION, classId);
      await deleteDoc(classRef);
    } catch (error) {
      console.error('Error deleting class:', error);
      throw new Error('Failed to delete class');
    }
  },
};