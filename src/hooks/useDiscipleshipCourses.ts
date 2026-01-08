'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase';
import type { DiscipleshipCourse } from '@/types/discipleship.types';

export function useDiscipleshipCourses() {
  const [courses, setCourses] = useState<DiscipleshipCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const coursesRef = collection(db, 'discipleshipCourses');
    const q = query(coursesRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const coursesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as DiscipleshipCourse[];
        
        setCourses(coursesData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error in courses listener:', err);
        setError('Failed to load courses');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { courses, loading, error };
}