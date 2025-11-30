import { Event, MerchandiseItem, Alumni, ContactInfo, GalleryContent } from './types';

// ==========================================
// 📷 ASSETS & CONTENT CONFIGURATION
// ==========================================
// Edit this file to change images, names, and text across the site.
// For images: You can use external URLs or paths to your public folder (e.g., "/images/my-photo.jpg")

export const BRANDING = {
  name: "MSVOSA",
  fullName: "Old Students Association",
  // REPLACE THE URL BELOW WITH YOUR LOGO PATH
  logo: "public/images/logo.png", 
};

// ==========================================
// 🔐 ADMIN ACCESS
// ==========================================
// 👇 CHANGE THESE VALUES TO SECURE YOUR APP 👇
export const ADMIN_ACCESS = {
  email: "admin@msvosa.org", // <--- Change this to your email
  password: "admin"          // <--- Change this to a strong password
};

export const CONTACT_INFO: ContactInfo = {
  email: 'alumni@school.edu',
  phone: '+1 (555) 123-4567',
  website: 'www.msvosa.org',
  address: '123 School Lane, Cityville'
};

export const HERO_CONTENT = {
  title: "Welcome to",
  highlight: "MSVOSA",
  description: "Reconnect with old friends, support the next generation, and keep the school spirit alive. Join the Old Students’ Association today.",
  // REPLACE THE URL BELOW WITH YOUR MAIN BANNER PHOTO
  image: "https://picsum.photos/1200/800?grayscale&blur=2", 
};

export const MISSION_STATEMENT = {
  title: "Our Mission",
  text: "MSVOSA is dedicated to fostering a lifelong connection between the institution and its alumni, promoting unity and pride while contributing to the development of the school and its current students through mentorship, scholarships, and infrastructure development.",
  values: ["✨ Unity", "🎓 Pride", "🤝 Contribution"],
  latestNews: [
    { title: "Scholarship Fund Reaches $50k Milestone", date: "2 days ago" },
    { title: "New Science Lab Inaugurated by Batch '95", date: "1 week ago" }
  ]
};

export const GALLERY_CONTENT: GalleryContent = {
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example video
  images: [
    "https://picsum.photos/400/300?random=20",
    "https://picsum.photos/400/300?random=21",
    "https://picsum.photos/400/300?random=22",
    "https://picsum.photos/400/300?random=23"
  ]
};

// ==========================================
// 👥 COMMITTEE MEMBERS
// ==========================================

export const COMMITTEE_LEADERSHIP = [
  { 
    name: "John Anderson", 
    role: "President", 
    // REPLACE WITH PRESIDENT PHOTO
    image: "https://picsum.photos/300/300?random=101", 
    bio: "Leading with vision to unite our alumni community."
  },
  { 
    name: "Robert Smith", 
    role: "Vice President", 
    // REPLACE WITH VICE PRESIDENT PHOTO
    image: "https://picsum.photos/300/300?random=105", 
    bio: "Supporting leadership and strategic initiatives."
  },
  { 
    name: "Karen Williams", 
    role: "Vice President", 
    // REPLACE WITH 2ND VICE PRESIDENT PHOTO
    image: "https://picsum.photos/300/300?random=111", 
    bio: "Overseeing membership engagement and outreach."
  },
  { 
    name: "Sarah Williams", 
    role: "Secretary", 
    // REPLACE WITH SECRETARY PHOTO
    image: "https://picsum.photos/300/300?random=102",
    bio: "Ensuring smooth operations and communication."
  },
  { 
    name: "Linda Brown", 
    role: "Asst. Secretary", 
    // REPLACE WITH ASST SECRETARY PHOTO
    image: "https://picsum.photos/300/300?random=106",
    bio: "Assisting in administrative coordination."
  },
  { 
    name: "Michael Chen", 
    role: "Treasurer", 
    // REPLACE WITH TREASURER PHOTO
    image: "https://picsum.photos/300/300?random=103",
    bio: "Managing the association's funds and scholarships."
  },
  { 
    name: "Emily Davis", 
    role: "Accountant", 
    // REPLACE WITH ACCOUNTANT PHOTO
    image: "https://picsum.photos/300/300?random=104",
    bio: "Maintaining financial transparency and records."
  },
  { 
    name: "James Wilson", 
    role: "Accountant", 
    // REPLACE WITH 2ND ACCOUNTANT PHOTO
    image: "https://picsum.photos/300/300?random=107",
    bio: "Auditing and financial reporting."
  },
  { 
    name: "Dr. Alan Grant", 
    role: "Chief Adviser", 
    // REPLACE WITH ADVISER PHOTO
    image: "https://picsum.photos/300/300?random=108",
    bio: "Providing wisdom and long-term guidance."
  },
  { 
    name: "Grace Lee", 
    role: "Patron (Boshakar)", 
    // REPLACE WITH BOSHAKAR PHOTO
    image: "https://picsum.photos/300/300?random=109",
    bio: "Distinguished patron supporting our cause."
  },
  { 
    name: "Henry Ford", 
    role: "Patron (Boshakar)", 
    // REPLACE WITH BOSHAKAR PHOTO
    image: "https://picsum.photos/300/300?random=110",
    bio: "Distinguished patron supporting our cause."
  },
];

export const COMMITTEE_MEMBERS_LIST = [
  "Robert Wilson", 
  "Jennifer Lo", 
  "David Miller", 
  "Jessica Taylor", 
  "Mark Thompson", 
  "Lisa Wong"
];

// ==========================================
// 🗓️ EVENTS
// ==========================================

export const EVENTS_DATA: Event[] = [
  {
    id: 1,
    title: "Annual Homecoming Gala",
    date: "Oct 15, 2024",
    location: "Grand Hall, Main Campus",
    description: "A night of nostalgia, fine dining, and reconnecting with batchmates. Dress code: Formal.",
    image: "https://picsum.photos/400/300?random=1"
  },
  {
    id: 2,
    title: "Career Guidance Workshop",
    date: "Nov 02, 2024",
    location: "Virtual (Zoom)",
    description: "Share your professional expertise with current students. Seeking mentors in Tech and Medicine.",
    image: "https://picsum.photos/400/300?random=2"
  },
  {
    id: 3,
    title: "Charity Fun Run",
    date: "Dec 10, 2024",
    location: "City Park Entrance",
    description: "5K run to raise funds for the Scholarship Program. Open to families and pets!",
    image: "https://picsum.photos/400/300?random=3"
  }
];

// ==========================================
// 🛍️ SHOP ITEMS
// ==========================================

export const SHOP_ITEMS: MerchandiseItem[] = [
  {
    id: 1,
    name: "Classic MSVOSA Hoodie",
    price: 45.00,
    category: "Apparel",
    image: "https://picsum.photos/300/300?random=10"
  },
  {
    id: 2,
    name: "Embroidered Cap",
    price: 25.00,
    category: "Accessories",
    image: "https://picsum.photos/300/300?random=11"
  },
  {
    id: 3,
    name: "Coffee Mug - Gold Edition",
    price: 15.00,
    category: "Home",
    image: "https://picsum.photos/300/300?random=12"
  },
  {
    id: 4,
    name: "Varsity Jacket",
    price: 85.00,
    category: "Apparel",
    image: "https://picsum.photos/300/300?random=13"
  }
];

// ==========================================
// 👥 DIRECTORY (INITIAL DATA)
// ==========================================

export const INITIAL_ALUMNI_DATA: Alumni[] = [
  { id: '1', name: 'Dr. Sarah James', graduationYear: 1998, profession: 'Doctor', location: 'London, UK' },
  { id: '2', name: 'Michael Chang', graduationYear: 2005, profession: 'Software Engineer', location: 'San Francisco, USA' },
  { id: '3', name: 'Anita Patel', graduationYear: 2010, profession: 'Teacher', location: 'Sydney, Australia' },
  { id: '4', name: 'David Okafor', graduationYear: 1995, profession: 'Civil Engineer', location: 'Lagos, Nigeria' },
  { id: '5', name: 'Elena Rodriguez', graduationYear: 2015, profession: 'Architect', location: 'Barcelona, Spain' },
  { id: '6', name: 'James Wilson', graduationYear: 1988, profession: 'Accountant', location: 'Toronto, Canada' },
];