'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-gray-200 shadow-xl z-50">
          <nav className="px-6 py-4 space-y-4">
            <a
              href="#about"
              className="block text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.about')}
            </a>
            <a
              href="#stories"
              className="block text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.stories')}
            </a>
            <a
              href="#events"
              className="block text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.events')}
            </a>
            <a
              href="#contact"
              className="block text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.contact')}
            </a>
            <div className="pt-4">
              <a
                href="#contact"
                className="block w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center shadow-md"
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.joinUs')}
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
} 