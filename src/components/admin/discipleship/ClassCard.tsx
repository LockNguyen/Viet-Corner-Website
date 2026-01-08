'use client';

import { formatClassTime, formatFullDateTime } from '@/utils/timeFormatter';
import { generateClassTitle } from '@/utils/classNumberFormatter';
import type { DiscipleshipClass } from '@/types/discipleship.types';

interface ClassCardProps {
  classItem: DiscipleshipClass;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ClassCard({ classItem, index, isExpanded, onToggle, onEdit, onDelete }: ClassCardProps) {
  const classTitle = generateClassTitle(index);
  const timeDisplay = formatClassTime(classItem.startTime, classItem.endTime);

  return (
    <div className="bg-white rounded-lg overflow-hidden mb-2 ml-12 border-l-4 border-green-400">
      <div 
        className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <svg 
                className={`w-4 h-4 transition-transform ${isExpanded ? 'transform rotate-90' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="font-medium text-gray-900">
              {classTitle} - {timeDisplay}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors text-sm"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-3 pb-3 ml-7 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <span>📅</span>
            <span>{formatFullDateTime(classItem.startTime)} - {formatFullDateTime(classItem.endTime)}</span>
          </div>
          {classItem.passage && (
            <div className="flex items-center gap-2 text-gray-700">
              <span>📖</span>
              <span>{classItem.passage}</span>
            </div>
          )}
          {classItem.contact && (
            <div className="flex items-center gap-2 text-gray-700">
              <span>📞</span>
              <span>{classItem.contact}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}