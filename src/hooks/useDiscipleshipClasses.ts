'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase';
import type { DiscipleshipClass } from '@/types/discipleship.types';

export function useDiscipleshipClasses(courseId: string | null, locationId: string | null) {
  const [classes, setClasses] = useState<DiscipleshipClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId || !locationId) {
      setClasses([]);
      setLoading(false);
      return;
    }

    const classesRef = collection(
      db, 
      'discipleshipCourses', 
      courseId, 
      'discipleshipLocations', 
      locationId, 
      'discipleshipClasses'
    );
    const q = query(classesRef, orderBy('startTime', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const classesData = snapshot.docs.map(doc => ({
          id: doc.id,
          courseId,
          locationId,
          ...doc.data(),
          startTime: doc.data().startTime?.toDate() || new Date(),
          endTime: doc.data().endTime?.toDate() || new Date(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as DiscipleshipClass[];
        
        setClasses(classesData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error in classes listener:', err);
        setError('Failed to load classes');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [courseId, locationId]);

  return { classes, loading, error };
}