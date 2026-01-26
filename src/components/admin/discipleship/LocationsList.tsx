'use client';

import { useState } from 'react';
import LocationCard from './LocationCard';
import LocationForm from './LocationForm';
import DeleteConfirmModal from '../shared/DeleteConfirmModal';
import { useDiscipleshipLocations } from '@/hooks/useDiscipleshipLocations';
import { discipleshipService } from '@/services/discipleshipService';
import type { DiscipleshipLocation } from '@/types/discipleship.types';

interface LocationsListProps {
  courseId: string;
}

export default function LocationsList({ courseId }: LocationsListProps) {
  const { locations, loading } = useDiscipleshipLocations(courseId);
  const [expandedLocations, setExpandedLocations] = useState<Set<string>>(new Set());
  const [editingLocation, setEditingLocation] = useState<DiscipleshipLocation | null>(null);
  const [deletingLocation, setDeletingLocation] = useState<DiscipleshipLocation | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleLocation = (locationId: string) => {
    setExpandedLocations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(locationId)) {
        newSet.delete(locationId);
      } else {
        newSet.add(locationId);
      }
      return newSet;
    });
  };

  const handleDelete = async () => {
    if (!deletingLocation) return;
    await discipleshipService.deleteLocation(courseId, deletingLocation.id);
    setDeletingLocation(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Location
        </button>
      </div>

      {locations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg ml-8">
          <p className="text-gray-500 text-sm">No locations added yet. Click &quot;Add Location&quot; to start.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              isExpanded={expandedLocations.has(location.id)}
              onToggle={() => toggleLocation(location.id)}
              onEdit={() => setEditingLocation(location)}
              onDelete={() => setDeletingLocation(location)}
            />
          ))}
        </div>
      )}

      {(showAddForm || editingLocation) && (
        <LocationForm
          courseId={courseId}
          location={editingLocation}
          onSuccess={() => {
            setShowAddForm(false);
            setEditingLocation(null);
          }}
          onCancel={() => {
            setShowAddForm(false);
            setEditingLocation(null);
          }}
        />
      )}

      {deletingLocation && (
        <DeleteConfirmModal
          entityType="Location"
          entityName={deletingLocation.name}
          warningMessage="This will delete all classes at this location."
          onConfirm={handleDelete}
          onCancel={() => setDeletingLocation(null)}
        />
      )}
    </>
  );
}