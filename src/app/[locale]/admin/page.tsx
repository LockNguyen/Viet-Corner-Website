'use client';

import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function AdminDashboard() {
  const t = useTranslations();

  const adminCards = [
    {
      title: t('admin.dashboard.events.title'),
      description: t('admin.dashboard.events.description'),
      href: '/admin/events',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: t('admin.dashboard.discipleship.title'),
      description: t('admin.dashboard.discipleship.description'),
      href: '/admin/discipleship',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        <Header />
        
        <section className="section-sm bg-gray-50">
          <div className="container">
            <h1 className="heading-1 text-gray-900 text-center">
              {t('admin.dashboard.title')}
            </h1>
            <p className="text-large text-gray-600 text-center mt-4">
              {t('admin.dashboard.subtitle')}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {adminCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group card-hover bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                  <div className="p-8">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${card.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {card.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span>Manage</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </AuthGuard>
  );
}