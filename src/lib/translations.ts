import translations from './translations.json';

export type Language = 'en' | 'vi';

export interface TranslationData {
  church: {
    name: string;
    subtitle: string;
  };
  navigation: {
    about: string;
    stories: string;
    events: string;
    contact: string;
    joinUs: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    planVisit: string;
    ourStories: string;
  };
  welcome: {
    title: string;
    description: string;
  };
  ministries: {
    title: string;
    subtitle: string;
    sundayServices: {
      title: string;
      description: string;
      link: string;
    };
    smallGroups: {
      title: string;
      description: string;
      link: string;
    };
    bibleStudies: {
      title: string;
      description: string;
      link: string;
    };
    communityImpact: {
      title: string;
      description: string;
      link: string;
    };
  };
  stories: {
    title: string;
    subtitle: string;
    viewAll: string;
    posts: {
      youthBand: {
        title: string;
        date: string;
        excerpt: string;
        fullContent: string;
      };
      crossCultural: {
        title: string;
        date: string;
        excerpt: string;
        fullContent: string;
      };
      youthFellowship: {
        title: string;
        date: string;
        excerpt: string;
        fullContent: string;
      };
      tetCelebration: {
        title: string;
        date: string;
        excerpt: string;
        fullContent: string;
      };
    };
  };
  events: {
    title: string;
    subtitle: string;
    viewCalendar: string;
    sundayService: {
      title: string;
      description: string;
      time: string;
      frequency: string;
    };
    prayerMeeting: {
      title: string;
      description: string;
      time: string;
      frequency: string;
    };
    youthMinistry: {
      title: string;
      description: string;
      time: string;
      frequency: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
  };
  footer: {
    description: string;
    planVisit: string;
    quickLinks: string;
    contactInfo: string;
    copyright: string;
    email: string;
    phone: string;
    serviceTime: string;
  };
}

class TranslationService {
  private translations: Record<Language, TranslationData>;

  constructor() {
    this.translations = translations as Record<Language, TranslationData>;
  }

  getTranslation(language: Language): TranslationData {
    return this.translations[language];
  }

  getText(language: Language, path: string): string {
    const keys = path.split('.');
    let value: any = this.translations[language];
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return path; // Return path if translation not found
      }
    }
    
    return typeof value === 'string' ? value : path;
  }
}

export const translationService = new TranslationService(); 