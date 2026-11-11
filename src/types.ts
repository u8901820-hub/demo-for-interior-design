export interface MenuItem {
  id: string;
  title: string;
  category: 'kitchen' | 'wardrobe' | 'living' | 'turnkey' | 'lighting' | 'commercial';
  categoryLabel: string;
  tagline: string;
  startingPrice: string;
  priceNote: string;
  estimatedTimeline: string;
  warranty: string;
  image: string;
  materials: string[];
  inclusions: string[];
  finishOptions: string[];
  description: string;
  featured?: boolean;
}

export interface Appointment {
  id: string;
  createdAt: string;
  format: 'studio' | 'onsite' | 'virtual';
  formatLabel: string;
  date: string;
  timeSlot: string;
  clientName: string;
  phone: string;
  email: string;
  propertyType: string;
  locationArea: string;
  budgetRange: string;
  interestedService?: string;
  specialNotes?: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  projectType: string;
  rating: number;
  date: string;
  comment: string;
  highlight: string;
}
