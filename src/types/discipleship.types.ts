export interface DiscipleshipCourse {
  id: string;
  name: string;
  description?: string | null;
}

export interface DiscipleshipLocation {
  id: string;
  courseId: string;
  name: string;
  thumbnailImageUrl?: string | null;
}

export interface DiscipleshipClass {
  id: string;
  courseId: string;
  locationId: string;
  startTime: Date;
  endTime: Date;
  contact?: string | null;
  passage?: string | null;
}

export interface DiscipleshipFormData {
  name: string;
  description?: string;
}

export interface LocationFormData {
  name: string;
  thumbnailImageUrl?: string;
}

export interface ClassFormData {
  startTime: string;
  endTime: string;
  contact?: string;
  passage?: string;
}