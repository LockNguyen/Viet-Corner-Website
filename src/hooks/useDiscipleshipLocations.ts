'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase';
import type { DiscipleshipLocation } from '@/types/discipleship.types';

export function useDiscipleshipLocations(courseId: string | null) {
  const [locations, setLocations] = useState<DiscipleshipLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLocations([]);
      setLoading(false);
      return;
    }

    const locationsRef = collection(db, 'discipleshipCourses', courseId, 'discipleshipLocations');
    const q = query(locationsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const locationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          courseId,
          ...doc.data(),
        })) as DiscipleshipLocation[];
        
        setLocations(locationsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error in locations listener:', err);
        setError('Failed to load locations');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [courseId]);

  return { locations, loading, error };
}