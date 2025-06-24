'use client';

import { useLanguage } from '../contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Ministries from './components/Ministries';
import Stories from './components/Stories';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Welcome />
      <Ministries />
      <Stories />
      <ContactForm />
      <Footer />
    </div>
  );
}
