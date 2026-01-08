'use client';

import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventsList from '@/components/admin/events/EventsList';
import EventForm from '@/components/admin/events/EventForm';
import DeleteConfirmModal from '@/components/admin/shared/DeleteConfirmModal';
import { useEvents } from '@/hooks/useEvents';
import { eventService } from '@/services/eventService';
import type { EventEntity } from '@/types/event.types';

type ViewMode = 'list' | 'create' | 'edit';

export default function AdminPage() {
  const { events, loading, error } = useEvents();
  const [mode, setMode] = useState<ViewMode>('list');
  const [selectedEvent, setSelectedEvent] = useState<EventEntity | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventEntity | null>(null);

  const handleEdit = (event: EventEntity) => {
    setSelectedEvent(event);
    setMode('edit');
  };

  const handleDelete = (event: EventEntity) => {
    setEventToDelete(event);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    await eventService.deleteEvent(eventToDelete.id);
    setEventToDelete(null);
  };

  const handleReorder = async (reorderedEvents: EventEntity[]) => {
    await eventService.reorderEvents(reorderedEvents);
  };

  const handleFormSuccess = () => {
    setMode('list');
    setSelectedEvent(null);
  };

  const handleFormCancel = () => {
    setMode('list');
    setSelectedEvent(null);
  };

  return (
    <AuthGuard>
        <div className="min-h-screen bg-gray-50">
        <Header />

        <section className="section-sm bg-white border-b">
            <div className="container">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                <h1 className="heading-1 mb-2">Events Management</h1>
                <p className="text-gray-600">Create, edit, and manage your events</p>
                </div>
                {mode === 'list' && (
                <button
                    onClick={() => setMode('create')}
                    className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Event
                </button>
                )}
            </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
            {loading ? (
                <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700">{error}</p>
                </div>
            ) : mode === 'list' ? (
                <EventsList
                events={events}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onReorder={handleReorder}
                />
            ) : (
                <EventForm
                event={selectedEvent}
                mode={mode === 'create' ? 'create' : 'edit'}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
                />
            )}
            </div>
        </section>

        <Footer />

        {eventToDelete && (
            <DeleteConfirmModal
            event={eventToDelete}
            onConfirm={confirmDelete}
            onCancel={() => setEventToDelete(null)}
            />
        )}
        </div>
    </AuthGuard>
  );
}