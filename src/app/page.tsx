'use client';

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from './components/ContactForm'
import MobileNav from './components/MobileNav'
import LanguageToggle from './components/LanguageToggle'

export default function Home() {
  const { t } = useLanguage();

  const storyPosts = [
    {
      key: 'youthBand',
      image: "/assets/Full youth band practicing for worship.jpg",
      alt: "Full youth band practicing for worship"
    },
    {
      key: 'crossCultural',
      image: "/assets/Meredith and Nguyen Anh duet Thank you Jesus for the Blood.jpg",
      alt: "Meredith and Nguyen Anh duet Thank you Jesus for the Blood"
    },
    {
      key: 'youthFellowship',
      image: "/assets/Youth gathers at house for fellowship and karaoke.jpg",
      alt: "Youth gathers at house for fellowship and karaoke"
    },
    {
      key: 'tetCelebration',
      image: "/assets/Tet Holiday Event 2025 _ Ladies in Traditional Dress.jpg",
      alt: "Tet Holiday Event 2025 _ Ladies in Traditional Dress"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-300 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-2xl">✝</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('church.name')}</h1>
                <p className="text-sm text-gray-700 font-semibold">{t('church.subtitle')}</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-900 hover:text-orange-600 transition-colors font-bold text-lg">{t('navigation.about')}</a>
              <a href="#stories" className="text-gray-900 hover:text-orange-600 transition-colors font-bold text-lg">{t('navigation.stories')}</a>
              <a href="#events" className="text-gray-900 hover:text-orange-600 transition-colors font-bold text-lg">{t('navigation.events')}</a>
              <a href="#contact" className="text-gray-900 hover:text-orange-600 transition-colors font-bold text-lg">{t('navigation.contact')}</a>
            </nav>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <a href="#contact" className="hidden md:block bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-xl text-lg">
                {t('navigation.joinUs')}
              </a>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div>
                <h2 className="text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
                  {t('hero.title')}
                  <span className="block text-orange-600 mt-4">{t('hero.subtitle')}</span>
                </h2>
                <p className="text-2xl text-gray-800 leading-relaxed mb-10 font-semibold">
                  {t('hero.description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="#contact" className="bg-orange-600 text-white px-10 py-5 rounded-xl font-bold hover:bg-orange-700 transition-colors text-center shadow-2xl text-xl">
                  {t('hero.planVisit')}
                </a>
                <Link href="/blog" className="border-3 border-orange-600 text-orange-600 px-10 py-5 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-colors text-center shadow-xl text-xl">
                  {t('hero.ourStories')}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/Church gathers at a Family House to celebrate new house.jpg"
                  alt="Church gathers at a Family House to celebrate new house"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
            {t('welcome.title')}
          </h2>
          <p className="text-xl text-gray-800 leading-relaxed font-semibold">
            {t('welcome.description')}
          </p>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-24 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {t('ministries.title')}
            </h2>
            <p className="text-xl text-gray-800 max-w-4xl mx-auto font-semibold">
              {t('ministries.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-3xl transition-shadow border-2 border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8">
                <span className="text-4xl">🕐</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">{t('ministries.sundayServices.title')}</h3>
              <p className="text-gray-800 leading-relaxed font-semibold mb-6">
                {t('ministries.sundayServices.description')}
              </p>
              <a href="#events" className="text-orange-600 font-bold hover:text-orange-700 text-lg">
                {t('ministries.sundayServices.link')}
              </a>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-3xl transition-shadow border-2 border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">{t('ministries.smallGroups.title')}</h3>
              <p className="text-gray-800 leading-relaxed font-semibold mb-6">
                {t('ministries.smallGroups.description')}
              </p>
              <a href="#contact" className="text-orange-600 font-bold hover:text-orange-700 text-lg">
                {t('ministries.smallGroups.link')}
              </a>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-3xl transition-shadow border-2 border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8">
                <span className="text-4xl">📖</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">{t('ministries.bibleStudies.title')}</h3>
              <p className="text-gray-800 leading-relaxed font-semibold mb-6">
                {t('ministries.bibleStudies.description')}
              </p>
              <a href="#contact" className="text-orange-600 font-bold hover:text-orange-700 text-lg">
                {t('ministries.bibleStudies.link')}
              </a>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-3xl transition-shadow border-2 border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">{t('ministries.communityImpact.title')}</h3>
              <p className="text-gray-800 leading-relaxed font-semibold mb-6">
                {t('ministries.communityImpact.description')}
              </p>
              <a href="#contact" className="text-orange-600 font-bold hover:text-orange-700 text-lg">
                {t('ministries.communityImpact.link')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {t('stories.title')}
            </h2>
            <p className="text-xl text-gray-800 max-w-4xl mx-auto font-semibold">
              {t('stories.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {storyPosts.map((post, index) => (
              <div key={post.key} className="bg-white border-3 border-gray-300 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative h-80">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-orange-500 text-2xl">📅</span>
                    <span className="text-lg text-gray-700 font-bold">{t(`stories.posts.${post.key}.date`)}</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-6">
                    {t(`stories.posts.${post.key}.title`)}
                  </h3>
                  <p className="text-gray-800 mb-8 leading-relaxed font-semibold text-lg">
                    {t(`stories.posts.${post.key}.excerpt`)}
                  </p>
                  <Link href="/blog" className="text-orange-600 font-bold hover:text-orange-700 text-xl">
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/blog" className="text-orange-600 font-bold hover:text-orange-700 text-2xl">
              {t('stories.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {t('events.title')}
            </h2>
            <p className="text-xl text-gray-800 max-w-4xl mx-auto font-semibold">
              {t('events.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow border-2 border-gray-200">
              <div className="relative h-56">
                <Image
                  src="/assets/Church gathers at a Family House to celebrate new house.jpg"
                  alt="Church gathering"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="text-lg text-orange-600 font-bold mb-3">Every Sunday</div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Sunday Worship Service</h3>
                <p className="text-gray-800 mb-6 font-semibold">Join us for worship, Bible teaching, and fellowship every Sunday morning.</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-700 font-bold">10:00 AM</span>
                  <a href="#contact" className="text-orange-600 font-bold hover:text-orange-700 text-lg">
                    Join us →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow border-2 border-gray-200">
              <div className="relative h-56">
                <Image
                  src="/assets/Youth gathers at house for fellowship and karaoke.jpg"
                  alt="Youth fellowship"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="text-lg text-orange-600 font-bold mb-3">Wednesday</div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Prayer Meeting</h3>
                <p className="text-gray-800 mb-6 font-semibold">Come together to pray for each other and the needs in our community.</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-700 font-bold">7:00 PM</span>
                  <a href="#contact" className="text-orange-600 font-bold hover:text-orange-700 text-lg">
                    Join us →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow border-2 border-gray-200">
              <div className="relative h-56">
                <Image
                  src="/assets/Pastor takes picture with youth in front of church.jpg"
                  alt="Pastor with youth"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="text-lg text-orange-600 font-bold mb-3">Monthly</div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Youth Ministry</h3>
                <p className="text-gray-800 mb-6 font-semibold">Special activities and Bible study for our youth and young adults.</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-700 font-bold">Various times</span>
                  <a href="#contact" className="text-orange-600 font-bold hover:text-orange-700 text-lg">
                    Learn more →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <a href="#contact" className="bg-orange-600 text-white px-12 py-6 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-2xl text-2xl">
              {t('events.viewCalendar')}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-gray-800 max-w-4xl mx-auto font-semibold">
              {t('contact.subtitle')}
            </p>
          </div>
          
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-16">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-2xl">✝</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black">{t('church.name')}</h4>
                  <p className="text-gray-400 font-semibold">{t('church.subtitle')}</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 font-semibold text-lg">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <a href="#contact" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-xl text-lg">
                  {t('footer.planVisit')}
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-black mb-8">{t('footer.quickLinks')}</h4>
              <div className="space-y-4">
                <a href="#about" className="block text-gray-400 hover:text-white transition-colors font-bold text-lg">{t('navigation.about')}</a>
                <a href="#stories" className="block text-gray-400 hover:text-white transition-colors font-bold text-lg">{t('navigation.stories')}</a>
                <a href="#events" className="block text-gray-400 hover:text-white transition-colors font-bold text-lg">{t('navigation.events')}</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors font-bold text-lg">{t('navigation.contact')}</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-black mb-8">{t('footer.contactInfo')}</h4>
              <div className="space-y-4 text-gray-400">
                <p className="flex items-center space-x-3">
                  <span>📧</span>
                  <span className="font-bold">info@vietnamesechurch.com</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span>📱</span>
                  <span className="font-bold">(555) 123-4567</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span>🕐</span>
                  <span className="font-bold">Sunday 10:00 AM</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t-2 border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p className="font-bold text-lg">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
