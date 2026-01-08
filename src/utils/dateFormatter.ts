interface DateFormatConfig {
  locale: string;
  weekdayFormat: 'long' | 'short' | 'narrow';
  monthFormat: 'numeric' | 'short' | 'long';
  dayFormat: 'numeric' | '2-digit';
  timeFormat: '12' | '24';
  separator: string;
}

const VIETNAMESE_CONFIG: DateFormatConfig = {
  locale: 'vi-VN',
  weekdayFormat: 'short',
  monthFormat: 'short',
  dayFormat: 'numeric',
  timeFormat: '12',
  separator: ', ',
};

const ENGLISH_CONFIG: DateFormatConfig = {
  locale: 'en-US',
  weekdayFormat: 'short',
  monthFormat: 'short',
  dayFormat: 'numeric',
  timeFormat: '12',
  separator: ', ',
};

export class DateFormatter {
  private config: DateFormatConfig;

  constructor(language: 'vi' | 'en' = 'vi') {
    this.config = language === 'vi' ? VIETNAMESE_CONFIG : ENGLISH_CONFIG;
  }

  formatEventDate(startDate: Date | null, endDate: Date | null): string {
    if (!startDate) return '';

    const weekday = this.formatWeekday(startDate);
    const date = this.formatDate(startDate);
    const timeRange = this.formatTimeRange(startDate, endDate);

    return `${weekday}${this.config.separator}${date}${timeRange ? `${this.config.separator}${timeRange}` : ''}`;
  }

  private formatWeekday(date: Date): string {
    if (this.config.locale === 'vi-VN') {
      const weekdayMap: Record<number, string> = {
        0: 'CN',
        1: 'T2', 
        2: 'T3',
        3: 'T4',
        4: 'T5',
        5: 'T6',
        6: 'T7',
      };
      return weekdayMap[date.getDay()];
    }
    
    const formatter = new Intl.DateTimeFormat(this.config.locale, {
      weekday: this.config.weekdayFormat,
    });
    return formatter.format(date);
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (this.config.locale === 'vi-VN') {
      return `${day} thg ${month}, ${year}`;
    }

    const formatter = new Intl.DateTimeFormat(this.config.locale, {
      day: this.config.dayFormat,
      month: this.config.monthFormat,
      year: 'numeric',
    });
    return formatter.format(date);
  }

  private formatTimeRange(startDate: Date, endDate: Date | null): string {
    const startTime = this.formatTime(startDate);
    
    if (!endDate) return startTime;

    const endTime = this.formatTime(endDate);
    return `${startTime} - ${endTime}`;
  }

  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    if (this.config.timeFormat === '12') {
      const period = hours >= 12 ? 'pm' : 'am';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      return `${displayHours}:${displayMinutes} ${period}`;
    }
    
    const displayHours = hours.toString().padStart(2, '0');
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes}`;
  }

  // Update configuration (for future changes)
  updateConfig(config: Partial<DateFormatConfig>) {
    this.config = { ...this.config, ...config };
  }
}

// Convenience functions
export function formatEventDateVN(startDate: Date | null, endDate: Date | null): string {
  const formatter = new DateFormatter('vi');
  return formatter.formatEventDate(startDate, endDate);
}

export function formatEventDateEN(startDate: Date | null, endDate: Date | null): string {
  const formatter = new DateFormatter('en');
  return formatter.formatEventDate(startDate, endDate);
}