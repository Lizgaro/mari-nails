export interface Service {
  id: string;
  title: string;
  duration: string;
  description: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  name: string;
  phone: string;
  comment: string;
}

export enum BookingStep {
  SELECT_SERVICE = 0,
  SELECT_DATE = 1,
  SELECT_TIME = 2,
  CONTACT_DETAILS = 3,
  CONFIRMATION = 4,
}