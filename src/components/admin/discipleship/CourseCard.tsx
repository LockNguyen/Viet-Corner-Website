'use client';

import { useState } from 'react';
import LocationsList from './LocationsList';
import type { DiscipleshipCourse } from '@/types/discipleship.types';

interface CourseCardProps {
  course: DiscipleshipCourse;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CourseCard({ course, isExpanded, onToggle, onEdit, onDelete }: CourseCardProps) {
  const [showAddLocation, setShowAddLocation] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <button
              type="button"
              className="mt-1 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <svg 
                className={`w-5 h-5 transition-transform ${isExpanded ? 'transform rotate-90' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
              {!isExpanded && course.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-600 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition-colors text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6">
          {course.description && (
            <p className="text-gray-700 mb-4">{course.description}</p>
          )}
          
          <LocationsList courseId={course.id} />
        </div>
      )}
    </div>
  );
}