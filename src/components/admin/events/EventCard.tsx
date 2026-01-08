'use client';

import Image from 'next/image';
import type { EventEntity } from '@/types/event.types';

interface EventCardProps {
  event: EventEntity;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export default function EventCard({ event, onEdit, onDelete, onMoveUp, onMoveDown }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      {event.thumbnailImageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={event.thumbnailImageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              event.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {event.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
        {event.recurring && (
            <span className="inline-flex items-center gap-1 text-xs text-blue-600 ml-2">
                <svg className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recurring
            </span>
        )}
        {event.subtitle && (
          <p className="text-sm text-gray-600 mb-3">{event.subtitle}</p>
        )}
        
        <div className="space-y-2 mb-4">
          {event.location && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </div>
          )}
          {event.dateDisplay && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.dateDisplay}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <div className="flex gap-1">
            {onMoveUp && (
              <button
                onClick={onMoveUp}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                aria-label="Move up"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
            {onMoveDown && (
              <button
                onClick={onMoveDown}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                aria-label="Move down"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}