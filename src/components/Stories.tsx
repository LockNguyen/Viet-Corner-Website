'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Stories() {
  const t = useTranslations();

  const storyPosts = [
    {
      key: 'youthBand',
      image: "/assets/Full youth band practicing for worship.jpg",
      alt: "Full youth band practicing for worship",
      title: "Youth Worship Band",
      description: "Young musicians coming together to lead worship and grow in faith."
    },
    {
      key: 'crossCultural',
      image: "/assets/Meredith and Nguyen Anh duet Thank you Jesus for the Blood.jpg",
      alt: "Meredith and Nguyen Anh duet Thank you Jesus for the Blood",
      title: "Cross-Cultural Worship",
      description: "Bridging cultures through music and shared faith experiences."
    },
    {
      key: 'youthFellowship',
      image: "/assets/Youth gathers at house for fellowship and karaoke.jpg",
      alt: "Youth gathers at house for fellowship and karaoke",
      title: "Youth Fellowship",
      description: "Building friendships and community through fun activities and fellowship."
    },
    {
      key: 'tetCelebration',
      image: "/assets/Tet Holiday Event 2025 _ Ladies in Traditional Dress.jpg",
      alt: "Tet Holiday Event 2025 _ Ladies in Traditional Dress",
      title: "Tet Celebration",
      description: "Honoring Vietnamese culture and traditions while celebrating our faith."
    }
  ];

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
          {storyPosts.map((story, index) => (
            <div key={story.key} className="card-hover group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="heading-3 text-gray-900 mb-3">
                  {story.title}
                </h3>
                <p className="text-body text-gray-600 mb-4">
                  {story.description}
                </p>
                <Link 
                  href="/blog" 
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Read more
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