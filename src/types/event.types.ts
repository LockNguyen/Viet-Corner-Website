export interface EventEntity {
  id: string;
  title: string;
  subtitle?: string | null;
  dateDisplay?: string | null; // Auto-generated, read-only
  heroImageUrl?: string | null;
  thumbnailImageUrl?: string | null;
  location?: string | null;
  notes?: string | null;
  startDateTime?: Date | null;
  endDateTime?: Date | null;
  isActive: boolean;
  recurring: boolean;
  order: number;
}

export interface EventFormData {
  title: string;
  subtitle: string;
  heroImageUrl: string;
  thumbnailImageUrl: string;
  location: string;
  notes: string;
  startDateTime: string;
  endDateTime: string;
  isActive: boolean;
  recurring: boolean;
}

export interface EventsFilter {
  search: string;
  status: 'all' | 'active' | 'inactive';
}