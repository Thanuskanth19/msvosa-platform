import React, { useState, useEffect } from 'react';
import { ViewState, Event, HeroContent, MissionContent, CommitteeMember, ContactInfo, MerchandiseItem, Branding, GalleryContent } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Events } from './components/Events';
import { Membership } from './components/Membership';
import { Shop } from './components/Shop';
import { Donate } from './components/Donate';
import { Committee } from './components/Committee';
import { AlumniDirectory } from './components/AlumniDirectory';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Multimedia } from './components/Multimedia';
import { MISSION_STATEMENT, BRANDING, HERO_CONTENT, COMMITTEE_LEADERSHIP, COMMITTEE_MEMBERS_LIST, SHOP_ITEMS, CONTACT_INFO, GALLERY_CONTENT } from './assets';
import { db } from './services/database';
import { Globe, Mail, Phone, MapPin, Loader2, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic Data State
  const [events, setEvents] = useState<Event[]>([]);
  
  // State that can now be loaded from DB
  const [branding, setBranding] = useState<Branding>(BRANDING);
  const [heroContent, setHeroContent] = useState<HeroContent>(HERO_CONTENT);
  const [missionContent, setMissionContent] = useState<MissionContent>(MISSION_STATEMENT);
  const [galleryContent, setGalleryContent] = useState<GalleryContent>(GALLERY_CONTENT);
  const [shopItems, setShopItems] = useState<MerchandiseItem[]>(SHOP_ITEMS);
  const [committeeLeadership, setCommitteeLeadership] = useState<CommitteeMember[]>(COMMITTEE_LEADERSHIP);
  const [committeeMembersList, setCommitteeMembersList] = useState<string[]>(COMMITTEE_MEMBERS_LIST);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(CONTACT_INFO);

  // Load All Data from Database
  useEffect(() => {
    const loadData = async () => {
      try {
        // Parallel loading for speed
        const [eventsData, siteData] = await Promise.all([
            db.getEvents(),
            db.getSiteContent()
        ]);
        
        setEvents(eventsData);
        
        // Populate state from DB (or defaults if DB is empty)
        setBranding(siteData.branding);
        setHeroContent(siteData.heroContent);
        setMissionContent(siteData.missionContent);
        if (siteData.galleryContent) setGalleryContent(siteData.galleryContent);
        setCommitteeLeadership(siteData.committeeLeadership);
        setCommitteeMembersList(siteData.committeeMembersList);
        setContactInfo(siteData.contactInfo);
        setShopItems(siteData.shopItems);

      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Callback to refresh data after Admin updates
  const refreshData = async () => {
    const eventsData = await db.getEvents();
    setEvents(eventsData);
    
    // Also refresh content in case it was updated
    const siteData = await db.getSiteContent();
    setBranding(siteData.branding);
    setHeroContent(siteData.heroContent);
    setCommitteeLeadership(siteData.committeeLeadership);
    setShopItems(siteData.shopItems);
    if (siteData.galleryContent) setGalleryContent(siteData.galleryContent);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-school-900 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading MSVOSA Platform...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero setView={setCurrentView} content={heroContent} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-school-900 mb-4 font-serif">{missionContent.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            {missionContent.text}
                        </p>
                        <div className="flex gap-4 text-school-800 font-medium">
                            {missionContent.values.map((val, idx) => (
                                <span key={idx} className="flex items-center gap-2">{val}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-school-100 rounded-xl p-6">
                         <h3 className="text-lg font-bold text-school-900 mb-2">Latest News</h3>
                         <ul className="space-y-3">
                             {missionContent.latestNews.map((news, idx) => (
                                 <li key={idx} className={`bg-white p-3 rounded shadow-sm border-l-4 ${idx % 2 === 0 ? 'border-school-gold' : 'border-school-900'}`}>
                                     <p className="font-semibold text-sm">{news.title}</p>
                                     <p className="text-xs text-gray-500">{news.date}</p>
                                 </li>
                             ))}
                         </ul>
                    </div>
                </div>
            </div>
            {/* Multimedia Section */}
            <Multimedia content={galleryContent} />

            {/* Donation Call to Action Section */}
            <div className="bg-school-900 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Heart className="w-12 h-12 text-school-gold mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white font-serif mb-4">Support Our Alma Mater</h2>
                <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                  Your contributions help fund scholarships, improve school infrastructure, and support current students.
                </p>
                <button 
                  onClick={() => setCurrentView('donate')}
                  className="bg-school-gold text-school-900 font-bold py-3 px-8 rounded-full hover:bg-white transition-colors"
                >
                  Make a Donation
                </button>
              </div>
            </div>
            <Committee leadership={committeeLeadership} membersList={committeeMembersList} />
            <Events events={events} />
          </>
        );
      case 'events':
        return <Events events={events} />;
      case 'directory':
        return <AlumniDirectory />;
      case 'membership':
        return <Membership />;
      case 'shop':
        return <Shop items={shopItems} />;
      case 'donate':
        return <Donate />;
      case 'admin':
        if (!isAdminAuthenticated) {
            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
                </div>
            );
        }
        return (
            <AdminDashboard 
                events={events} 
                onEventsUpdate={refreshData}
                heroContent={heroContent}
                setHeroContent={setHeroContent}
                missionContent={missionContent}
                setMissionContent={setMissionContent}
                galleryContent={galleryContent}
                setGalleryContent={setGalleryContent}
                committeeLeadership={committeeLeadership}
                setCommitteeLeadership={setCommitteeLeadership}
                committeeMembersList={committeeMembersList}
                setCommitteeMembersList={setCommitteeMembersList}
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
                shopItems={shopItems}
                setShopItems={setShopItems}
                branding={branding}
                setBranding={setBranding}
            />
        );
      default:
        return <Hero setView={setCurrentView} content={heroContent} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar currentView={currentView} setView={setCurrentView} branding={branding} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4 font-serif">{branding.name}</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Bridging the gap between past and present. Together we build a stronger future for our alma mater.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentView('membership')} className="hover:text-school-gold">Become a Member</button></li>
                <li><button onClick={() => setCurrentView('events')} className="hover:text-school-gold">Upcoming Events</button></li>
                <li><button onClick={() => setCurrentView('donate')} className="hover:text-school-gold">Donate</button></li>
                <li><button onClick={() => setCurrentView('shop')} className="hover:text-school-gold">Merchandise</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> {contactInfo.email}</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> {contactInfo.phone}</li>
                <li className="flex items-center gap-2"><Globe className="w-4 h-4" /> {contactInfo.website}</li>
                {contactInfo.address && <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {contactInfo.address}</li>}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2024 {branding.name} - {branding.fullName}. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span className="opacity-60">Designed & Developed by</span>
              <div className="flex items-center gap-2">
                <img 
                  src="https://ui-avatars.com/api/?name=Thanuskanth&background=f59e0b&color=1e3a8a&size=128" 
                  alt="Developer" 
                  className="w-8 h-8 rounded-full border border-gray-700" 
                />
                <div className="flex flex-col">
                  <span className="text-school-gold font-semibold">Thanuskanth</span>
                  <a href="mailto:smthanu19@gmail.com" className="hover:text-white transition-colors text-[10px]">smthanu19@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;