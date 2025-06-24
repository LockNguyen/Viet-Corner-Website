'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12">
          <div className="text-6xl mb-6">✅</div>
          <h3 className="text-3xl font-black text-gray-900 mb-4">
            Thank you for your message!
          </h3>
          <p className="text-xl text-gray-800 font-semibold mb-8">
            We'll get back to you soon. God bless you!
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-xl text-lg"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Contact Info */}
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-black text-gray-900 mb-6">
            Get in Touch
          </h3>
          <p className="text-xl text-gray-800 leading-relaxed font-semibold">
            We'd love to hear from you and answer any questions you might have about our church community.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📧</span>
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900">Email</h4>
              <p className="text-gray-800 font-semibold">info@vietnamesechurch.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📱</span>
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900">Phone</h4>
              <p className="text-gray-800 font-semibold">(555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🕐</span>
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900">Service Times</h4>
              <p className="text-gray-800 font-semibold">Sunday 10:00 AM</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📍</span>
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900">Location</h4>
              <p className="text-gray-800 font-semibold">123 Church Street<br />City, State 12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-gray-200">
        <h3 className="text-3xl font-black text-gray-900 mb-8">
          Send us a Message
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-bold text-gray-900 mb-3">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-semibold"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-bold text-gray-900 mb-3">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-semibold"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-bold text-gray-900 mb-3">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-semibold"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-bold text-gray-900 mb-3">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-semibold resize-none"
              placeholder="Tell us how we can help you..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-5 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-xl text-xl"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
} 