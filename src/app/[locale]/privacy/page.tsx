import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

  const sections = ['collection', 'use', 'protection', 'contact'] as const;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="section-sm bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-1 text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-600">
              {t('lastUpdated')}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-large text-gray-700 mb-12">
              {t('intro')}
            </p>

            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section}>
                  <h2 className="heading-3 text-gray-900 mb-4">
                    {t(`sections.${section}.title`)}
                  </h2>
                  <p className="text-body text-gray-600">
                    {t(`sections.${section}.content`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link 
                href="/" 
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('backToHome')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
