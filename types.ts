

export type ViewState = 'home' | 'events' | 'membership' | 'shop' | 'admin' | 'directory' | 'donate';

export interface Branding {
  name: string;
  fullName: string;
  logo: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export interface MerchandiseItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MerchandiseItem {
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  date: string;
}

export interface GenerationRequest {
  topic: string;
  type: 'Email Newsletter' | 'Social Media Post' | 'Event Invitation' | 'Fundraising Appeal';
  tone: 'Professional' | 'Nostalgic' | 'Exciting' | 'Urgent';
}

export interface Alumni {
  id: string;
  name: string;
  graduationYear: number;
  profession: string;
  location?: string;
  email?: string;
}

export interface NewsItem {
  title: string;
  date: string;
}

export interface HeroContent {
  title: string;
  highlight: string;
  description: string;
  image: string;
}

export interface MissionContent {
  title: string;
  text: string;
  values: string[];
  latestNews: NewsItem[];
}

export interface GalleryContent {
  videoUrl: string;
  images: string[];
}

export interface CommitteeMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  website: string;
  address: string;
}