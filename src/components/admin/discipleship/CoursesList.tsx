'use client';

import { useState } from 'react';
import CourseCard from './CourseCard';
import CourseForm from './CourseForm';
import DeleteConfirmModal from '../shared/DeleteConfirmModal';
import { discipleshipService } from '@/services/discipleshipService';
import type { DiscipleshipCourse } from '@/types/discipleship.types';

interface CoursesListProps {
  courses: DiscipleshipCourse[];
}

export default function CoursesList({ courses }: CoursesListProps) {
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [editingCourse, setEditingCourse] = useState<DiscipleshipCourse | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<DiscipleshipCourse | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const handleDelete = async () => {
    if (!deletingCourse) return;
    await discipleshipService.deleteCourse(deletingCourse.id);
    setDeletingCourse(null);
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No courses yet</h3>
        <p className="mt-2 text-sm text-gray-500">Get started by creating your first discipleship course.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isExpanded={expandedCourses.has(course.id)}
            onToggle={() => toggleCourse(course.id)}
            onEdit={() => setEditingCourse(course)}
            onDelete={() => setDeletingCourse(course)}
          />
        ))}
      </div>

      {(showAddForm || editingCourse) && (
        <CourseForm
          course={editingCourse}
          onSuccess={() => {
            setShowAddForm(false);
            setEditingCourse(null);
          }}
          onCancel={() => {
            setShowAddForm(false);
            setEditingCourse(null);
          }}
        />
      )}

      {deletingCourse && (
        <DeleteConfirmModal
          entityType="Course"
          entityName={deletingCourse.name}
          warningMessage="This will delete all locations and classes under this course."
          onConfirm={handleDelete}
          onCancel={() => setDeletingCourse(null)}
        />
      )}
    </>
  );
}