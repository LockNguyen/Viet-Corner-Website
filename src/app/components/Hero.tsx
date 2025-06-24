'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/Church gathers at a Family House to celebrate new house.jpg"
          alt="Church gathers at a Family House to celebrate new house"
          fill
          className="object-cover"
          priority
        />
        <div className="image-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl">
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="heading-1 text-white text-shadow">
                {t('hero.title')}
                <span className="block text-blue-200 mt-2">
                  {t('hero.subtitle')}
                </span>
              </h1>
              <p className="text-large text-white/90 text-shadow max-w-2xl">
                {t('hero.description')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact" className="btn-primary text-lg px-8 py-4">
                {t('hero.planVisit')}
              </Link>
              <Link href="/blog" className="btn-outline text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-gray-900">
                {t('hero.ourStories')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
} 