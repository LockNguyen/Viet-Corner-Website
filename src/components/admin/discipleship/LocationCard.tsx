'use client';

import { useState } from 'react';
import Image from 'next/image';
import ClassesList from './ClassesList';
import type { DiscipleshipLocation } from '@/types/discipleship.types';

interface LocationCardProps {
  location: DiscipleshipLocation;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function LocationCard({ location, isExpanded, onToggle, onEdit, onDelete }: LocationCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden mb-3 ml-8 border-l-4 border-purple-400">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-100 transition-colors"
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
            <div className="flex items-center gap-3 flex-1">
              {location.thumbnailImageUrl && !isExpanded && (
                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={location.thumbnailImageUrl}
                    alt={location.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h4 className="font-medium text-gray-900">{location.name}</h4>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
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
        <div className="px-4 pb-4">
          {location.thumbnailImageUrl && (
            <div className="mb-4 relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={location.thumbnailImageUrl}
                alt={location.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <ClassesList courseId={location.courseId} locationId={location.id} />
        </div>
      )}
    </div>
  );
}