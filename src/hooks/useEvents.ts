'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase';
import type { EventEntity } from '@/types/event.types';
import { getNextOccurrence, calculateRecurringEndDateTime } from '@/utils/recurringEvents';

export function useEvents() {
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, orderBy('order', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const eventsData = snapshot.docs.map(doc => {
          const data = doc.data();
          const originalStartDate = data.startDateTime?.toDate() || null;
          const originalEndDate = data.endDateTime?.toDate() || null;

          // Calculate next occurrence for recurring events
          const startDateTime = data.recurring && originalStartDate
            ? getNextOccurrence(originalStartDate, true)
            : originalStartDate;

          const endDateTime = data.recurring && originalStartDate && originalEndDate
            ? calculateRecurringEndDateTime(originalStartDate, originalEndDate, true)
            : originalEndDate;

          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            startDateTime,
            endDateTime,
            recurring: data.recurring ?? false,
          };
        }) as EventEntity[];
        
        setEvents(eventsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error in events listener:', err);
        setError('Failed to load events');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const refreshEvents = () => {
    setLoading(true);
  };

  return { events, loading, error, refreshEvents };
}