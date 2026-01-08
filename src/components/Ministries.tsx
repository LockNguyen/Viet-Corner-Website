'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Ministries() {
  const { t } = useLanguage();

  const ministries = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('ministries.sundayServices.title'),
      description: t('ministries.sundayServices.description'),
      link: t('ministries.sundayServices.link'),
      href: '#events',
      color: 'blue'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t('ministries.smallGroups.title'),
      description: t('ministries.smallGroups.description'),
      link: t('ministries.smallGroups.link'),
      href: '#contact',
      color: 'purple'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: t('ministries.bibleStudies.title'),
      description: t('ministries.bibleStudies.description'),
      link: t('ministries.bibleStudies.link'),
      href: '#contact',
      color: 'green'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: t('ministries.communityImpact.title'),
      description: t('ministries.communityImpact.description'),
      link: t('ministries.communityImpact.link'),
      href: '#contact',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="section section-gradient">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 mb-6">
            {t('ministries.title')}
          </h2>
          <p className="text-large text-gray-700 max-w-3xl mx-auto">
            {t('ministries.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ministries.map((ministry, index) => (
            <div key={index} className="card-hover p-8">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 border ${getColorClasses(ministry.color)}`}>
                {ministry.icon}
              </div>
              <h3 className="heading-3 text-gray-900 mb-4">
                {ministry.title}
              </h3>
              <p className="text-body text-gray-600 mb-6">
                {ministry.description}
              </p>
              <a 
                href={ministry.href} 
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                {ministry.link}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 