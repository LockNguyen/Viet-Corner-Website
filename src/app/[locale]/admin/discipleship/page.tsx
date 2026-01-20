'use client';

import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CoursesList from '@/components/admin/discipleship/CoursesList';
import CourseForm from '@/components/admin/discipleship/CourseForm';
import { useTranslations } from 'next-intl';
import { useDiscipleshipCourses } from '@/hooks/useDiscipleshipCourses';

export default function DiscipleshipCoursesPage() {
  const t = useTranslations();
  const { courses, loading, error } = useDiscipleshipCourses();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        <Header />
        
        <section className="section-sm bg-gray-50">
          <div className="container">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="heading-1 text-gray-900">
                  {t('admin.discipleship.title')}
                </h1>
                <p className="text-gray-600 mt-2">
                  {t('admin.discipleship.subtitle')}
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Course
              </button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700">{error}</p>
              </div>
            ) : (
              <CoursesList courses={courses} />
            )}
          </div>
        </section>

        <Footer />

        {showAddForm && (
          <CourseForm
            onSuccess={() => setShowAddForm(false)}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </div>
    </AuthGuard>
  );
}