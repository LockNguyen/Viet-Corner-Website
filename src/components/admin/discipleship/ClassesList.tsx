'use client';

import { useState } from 'react';
import ClassCard from './ClassCard';
import ClassForm from './ClassForm';
import DeleteConfirmModal from '../shared/DeleteConfirmModal';
import { useDiscipleshipClasses } from '@/hooks/useDiscipleshipClasses';
import { discipleshipService } from '@/services/discipleshipService';
import { generateClassTitle } from '@/utils/classNumberFormatter';
import type { DiscipleshipClass } from '@/types/discipleship.types';

interface ClassesListProps {
  courseId: string;
  locationId: string;
}

export default function ClassesList({ courseId, locationId }: ClassesListProps) {
  const { classes, loading } = useDiscipleshipClasses(courseId, locationId);
  const [expandedClasses, setExpandedClasses] = useState<Set<string>>(new Set());
  const [editingClass, setEditingClass] = useState<DiscipleshipClass | null>(null);
  const [deletingClass, setDeletingClass] = useState<DiscipleshipClass | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleClass = (classId: string) => {
    setExpandedClasses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(classId)) {
        newSet.delete(classId);
      } else {
        newSet.add(classId);
      }
      return newSet;
    });
  };

  const handleDelete = async () => {
    if (!deletingClass) return;
    await discipleshipService.deleteClass(courseId, locationId, deletingClass.id);
    setDeletingClass(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 ml-8">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Class
        </button>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg ml-12">
          <p className="text-gray-500 text-sm">No classes scheduled yet. Click &quot;Add Class&quot; to add one.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {classes.map((classItem, index) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              index={index}
              isExpanded={expandedClasses.has(classItem.id)}
              onToggle={() => toggleClass(classItem.id)}
              onEdit={() => setEditingClass(classItem)}
              onDelete={() => setDeletingClass(classItem)}
            />
          ))}
        </div>
      )}

      {(showAddForm || editingClass) && (
        <ClassForm
          courseId={courseId}
          locationId={locationId}
          classItem={editingClass}
          onSuccess={() => {
            setShowAddForm(false);
            setEditingClass(null);
          }}
          onCancel={() => {
            setShowAddForm(false);
            setEditingClass(null);
          }}
        />
      )}

      {deletingClass && (
        <DeleteConfirmModal
          entityType="Class"
          entityName={`${generateClassTitle(classes.findIndex(c => c.id === deletingClass.id))}`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingClass(null)}
        />
      )}
    </>
  );
}