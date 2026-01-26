'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Stories() {
  const t = useTranslations();

  const storyKeys = ['youthBand', 'crossCultural', 'youthFellowship', 'tetCelebration'] as const;

  const storyImages: Record<string, string> = {
    youthBand: "/assets/Full youth band practicing for worship.jpg",
    crossCultural: "/assets/Meredith and Nguyen Anh duet Thank you Jesus for the Blood.jpg",
    youthFellowship: "/assets/Youth gathers at house for fellowship and karaoke.jpg",
    tetCelebration: "/assets/Tet Holiday Event 2025 _ Ladies in Traditional Dress.jpg"
  };

  return (
    <section id="stories" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 mb-6">
            {t('stories.title')}
          </h2>
          <p className="text-large text-gray-700 max-w-3xl mx-auto">
            {t('stories.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {storyKeys.map((key) => (
            <div key={key} className="card-hover group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={storyImages[key]}
                  alt={t(`stories.cards.${key}.alt`)}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="heading-3 text-gray-900 mb-3">
                  {t(`stories.cards.${key}.title`)}
                </h3>
                <p className="text-body text-gray-600 mb-4">
                  {t(`stories.cards.${key}.description`)}
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  {t('stories.readMore')}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="btn-outline">
            {t('stories.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}