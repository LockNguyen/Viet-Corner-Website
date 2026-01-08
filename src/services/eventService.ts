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
import type { EventEntity } from '@/types/event.types';
import { formatEventDateVN } from '@/utils/dateFormatter';

const COLLECTION_NAME = 'events';

export const eventService = {
  async getAllEvents(): Promise<EventEntity[]> {
    try {
      const eventsRef = collection(db, COLLECTION_NAME);
      const q = query(eventsRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        startDateTime: doc.data().startDateTime?.toDate() || null,
        endDateTime: doc.data().endDateTime?.toDate() || null,
      })) as EventEntity[];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Failed to fetch events');
    }
  },

  async getEventById(id: string): Promise<EventEntity | null> {
    try {
      const eventRef = doc(db, COLLECTION_NAME, id);
      const eventDoc = await getDoc(eventRef);
      
      if (!eventDoc.exists()) return null;
      
      return {
        id: eventDoc.id,
        ...eventDoc.data(),
        createdAt: eventDoc.data().createdAt?.toDate() || new Date(),
        updatedAt: eventDoc.data().updatedAt?.toDate() || new Date(),
        startDateTime: eventDoc.data().startDateTime?.toDate() || null,
        endDateTime: eventDoc.data().endDateTime?.toDate() || null,
      } as EventEntity;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw new Error('Failed to fetch event');
    }
  },

  async createEvent(data: Partial<EventEntity>): Promise<string> {
    try {
      const now = Timestamp.now();
      const eventsRef = collection(db, COLLECTION_NAME);
      
      const allEvents = await this.getAllEvents();
      const maxOrder = allEvents.length > 0 
        ? Math.max(...allEvents.map(e => e.order)) 
        : 0;

      // Auto-generate dateDisplay
      const dateDisplay = data.startDateTime 
        ? formatEventDateVN(
            new Date(data.startDateTime), 
            data.endDateTime ? new Date(data.endDateTime) : null
          )
        : null;

      const eventData = {
        ...data,
        dateDisplay, // Auto-generated
        createdAt: now,
        updatedAt: now,
        order: maxOrder + 1,
        recurring: data.recurring ?? false, // NEW
        startDateTime: data.startDateTime 
          ? Timestamp.fromDate(new Date(data.startDateTime)) 
          : null,
        endDateTime: data.endDateTime 
          ? Timestamp.fromDate(new Date(data.endDateTime)) 
          : null,
        isActive: data.isActive ?? true,
      };

      const docRef = await addDoc(eventsRef, eventData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  },

  async updateEvent(id: string, data: Partial<EventEntity>): Promise<void> {
    try {
      const eventRef = doc(db, COLLECTION_NAME, id);

      // Auto-generate dateDisplay if dates changed
      const dateDisplay = (data.startDateTime !== undefined)
        ? formatEventDateVN(
            data.startDateTime ? new Date(data.startDateTime) : null,
            data.endDateTime ? new Date(data.endDateTime) : null
          )
        : undefined;

      const updateData: any = {
        ...data,
        updatedAt: Timestamp.now(),
      };

      if (data.startDateTime) {
        updateData.startDateTime = Timestamp.fromDate(new Date(data.startDateTime));
      }
      if (data.endDateTime) {
        updateData.endDateTime = Timestamp.fromDate(new Date(data.endDateTime));
      }

      await updateDoc(eventRef, updateData);
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('Failed to update event');
    }
  },

  async deleteEvent(id: string): Promise<void> {
    try {
      const eventRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(eventRef);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Failed to delete event');
    }
  },

  async reorderEvents(events: EventEntity[]): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      events.forEach((event, index) => {
        const eventRef = doc(db, COLLECTION_NAME, event.id);
        batch.update(eventRef, { 
          order: index,
          updatedAt: Timestamp.now(),
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error reordering events:', error);
      throw new Error('Failed to reorder events');
    }
  },
};