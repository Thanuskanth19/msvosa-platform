
import React, { useState, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { Event, Alumni, HeroContent, MissionContent, CommitteeMember, ContactInfo, MerchandiseItem, Branding, GalleryContent, Order } from '../types';
import { db, SiteData } from '../services/database';
import { Users, Database, Layout, Plus, Trash2, Save, Edit3, Briefcase, Phone, X, ShoppingBag, Image as ImageIcon, Loader2, Video, Package, CheckCircle, Clock } from 'lucide-react';

interface AdminDashboardProps {
  events: Event[];
  onEventsUpdate: () => void;
  heroContent: HeroContent;
  setHeroContent: React.Dispatch<React.SetStateAction<HeroContent>>;
  missionContent: MissionContent;
  setMissionContent: React.Dispatch<React.SetStateAction<MissionContent>>;
  galleryContent: GalleryContent;
  setGalleryContent: React.Dispatch<React.SetStateAction<GalleryContent>>;
  committeeLeadership: CommitteeMember[];
  setCommitteeLeadership: React.Dispatch<React.SetStateAction<CommitteeMember[]>>;
  committeeMembersList: string[];
  setCommitteeMembersList: React.Dispatch<React.SetStateAction<string[]>>;
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  shopItems: MerchandiseItem[];
  setShopItems: React.Dispatch<React.SetStateAction<MerchandiseItem[]>>;
  branding: Branding;
  setBranding: React.Dispatch<React.SetStateAction<Branding>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  events, 
  onEventsUpdate,
  heroContent, 
  setHeroContent,
  missionContent,
  setMissionContent,
  galleryContent,
  setGalleryContent,
  committeeLeadership,
  setCommitteeLeadership,
  committeeMembersList,
  setCommitteeMembersList,
  contactInfo,
  setContactInfo,
  shopItems,
  setShopItems,
  branding,
  setBranding
}) => {
  const [activeTab, setActiveTab] = useState<'membership' | 'website' | 'database' | 'committee' | 'shop'>('membership');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingSite, setIsSavingSite] = useState(false);
  
  // Local state for membership management
  const [members, setMembers] = useState<Alumni[]>([]);
  
  // Local state for orders
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load members when tab is active
    if (activeTab === 'membership') {
        db.getMembers().then(setMembers);
    }
    // Load orders when shop tab is active
    if (activeTab === 'shop') {
        db.getOrders().then(setOrders);
    }
  }, [activeTab]);
  
  const [newMember, setNewMember] = useState<Partial<Alumni>>({ name: '', graduationYear: 2024, profession: '', location: '' });
  const [newEvent, setNewEvent] = useState<Partial<Event>>({ title: '', date: '', location: '', description: '', image: 'https://picsum.photos/400/300' });
  
  // Committee local state
  const [newLeader, setNewLeader] = useState<Partial<CommitteeMember>>({ name: '', role: '', bio: '', image: 'https://picsum.photos/300/300' });
  const [generalMemberInput, setGeneralMemberInput] = useState('');

  // Shop local state
  const [newProduct, setNewProduct] = useState<Partial<MerchandiseItem>>({ name: '', price: 0, category: 'Apparel', image: 'https://picsum.photos/300/300' });

  // === GENERAL SITE SAVING ===
  // Gathers all the props state and saves it to DB as one blob
  const handleSaveAllSiteContent = async () => {
    setIsSavingSite(true);
    const fullContent: SiteData = {
        branding,
        heroContent,
        missionContent,
        galleryContent,
        committeeLeadership,
        committeeMembersList,
        contactInfo,
        shopItems
    };

    try {
        await db.saveSiteContent(fullContent);
        alert("✅ All changes saved successfully to database!");
    } catch (error) {
        alert("❌ Failed to save. Please check database connection.");
    } finally {
        setIsSavingSite(false);
    }
  };

  // MEMBERSHIP HANDLERS
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name) return;
    setIsSubmitting(true);
    try {
        await db.addMember({
            name: newMember.name,
            graduationYear: newMember.graduationYear || 2024,
            profession: newMember.profession || 'Unknown',
            location: newMember.location || 'Unknown'
        });
        const updatedList = await db.getMembers();
        setMembers(updatedList);
        setNewMember({ name: '', graduationYear: 2024, profession: '', location: '' });
        alert("Member added successfully!");
    } catch (error) {
        alert("Error adding member");
        console.error(error);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if(window.confirm("Are you sure you want to remove this member?")) {
        try {
            await db.deleteMember(id);
            setMembers(members.filter(m => m.id !== id));
        } catch (error) {
            alert("Error deleting member");
        }
    }
  };

  // EVENTS HANDLERS
  const handleAddEvent = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newEvent.title) return;
      setIsSubmitting(true);
      try {
        await db.addEvent({
            title: newEvent.title!,
            date: newEvent.date || 'TBD',
            location: newEvent.location || 'TBD',
            description: newEvent.description || '',
            image: newEvent.image || 'https://picsum.photos/400/300'
        });
        onEventsUpdate(); // Refresh parent state
        setNewEvent({ title: '', date: '', location: '', description: '', image: 'https://picsum.photos/400/300' });
        alert("Event published to database!");
      } catch (error) {
          alert("Error adding event");
          console.error(error);
      } finally {
          setIsSubmitting(false);
      }
  };

  const handleDeleteEvent = async (id: number) => {
      if(window.confirm("Delete this event?")) {
          try {
            await db.deleteEvent(id);
            onEventsUpdate();
          } catch(e) {
              alert("Error deleting event");
          }
      }
  };

  // SHOP HANDLERS
  const handleAddProduct = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newProduct.name) return;
      const product: MerchandiseItem = {
          id: Date.now(),
          name: newProduct.name!,
          price: Number(newProduct.price) || 0,
          category: newProduct.category || 'Apparel',
          image: newProduct.image || 'https://picsum.photos/300/300'
      };
      setShopItems([...shopItems, product]);
      setNewProduct({ name: '', price: 0, category: 'Apparel', image: 'https://picsum.photos/300/300' });
  };

  const handleUpdateProductImage = (id: number, newUrl: string) => {
      setShopItems(shopItems.map(p => p.id === id ? { ...p, image: newUrl } : p));
  };

  const handleDeleteProduct = (id: number) => {
    if(window.confirm("Delete this product?")) {
        setShopItems(shopItems.filter(p => p.id !== id));
    }
  };

  const handleCompleteOrder = async (id: number) => {
    if(window.confirm("Mark this order as Completed?")) {
        await db.updateOrderStatus(id, 'Completed');
        const updated = await db.getOrders();
        setOrders(updated);
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if(window.confirm("Delete this order record?")) {
        await db.deleteOrder(id);
        const updated = await db.getOrders();
        setOrders(updated);
    }
  };

  // COMMITTEE HANDLERS
  const handleAddLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newLeader.name || !newLeader.role) return;
    setCommitteeLeadership([...committeeLeadership, newLeader as CommitteeMember]);
    setNewLeader({ name: '', role: '', bio: '', image: 'https://picsum.photos/300/300' });
  };

  const handleUpdateLeaderImage = (index: number, newUrl: string) => {
      const updated = [...committeeLeadership];
      updated[index].image = newUrl;
      setCommitteeLeadership(updated);
  };

  const handleDeleteLeader = (index: number) => {
    if(window.confirm("Remove this person from leadership?")) {
        const updated = [...committeeLeadership];
        updated.splice(index, 1);
        setCommitteeLeadership(updated);
    }
  };

  const handleAddGeneralMember = () => {
    if (!generalMemberInput.trim()) return;
    setCommitteeMembersList([...committeeMembersList, generalMemberInput.trim()]);
    setGeneralMemberInput('');
  };

  const handleDeleteGeneralMember = (index: number) => {
    const updated = [...committeeMembersList];
    updated.splice(index, 1);
    setCommitteeMembersList(updated);
  };

  const SaveButton = () => (
    <div className="flex justify-end sticky bottom-6 z-10">
        <button 
            onClick={handleSaveAllSiteContent} 
            disabled={isSavingSite}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isSavingSite ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} 
            {isSavingSite ? "Saving..." : "Save Changes"}
        </button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'membership':
        return (
          <div className="space-y-8">
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-school-gold" /> Add New Member
                </h3>
                <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input className="border p-2 rounded" placeholder="Full Name" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required />
                    <input className="border p-2 rounded" type="number" placeholder="Year" value={newMember.graduationYear} onChange={e => setNewMember({...newMember, graduationYear: parseInt(e.target.value)})} required />
                    <input className="border p-2 rounded" placeholder="Profession" value={newMember.profession} onChange={e => setNewMember({...newMember, profession: e.target.value})} />
                    <button type="submit" disabled={isSubmitting} className="bg-school-900 text-white px-4 py-2 rounded hover:bg-school-800 flex justify-center items-center">
                        {isSubmitting ? <Loader2 className="animate-spin w-4 h-4"/> : "Add Member"}
                    </button>
                </form>
             </div>

             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-700">Member Database ({members.length})</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map(member => (
                                <tr key={member.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.graduationYear}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.profession}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleDeleteMember(member.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
          </div>
        );

      case 'database':
        return (
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-school-gold" /> Create New Event
                    </h3>
                    <form onSubmit={handleAddEvent} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="border p-2 rounded" placeholder="Event Title" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} required />
                            <input className="border p-2 rounded" placeholder="Date (e.g. Oct 15, 2024)" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} required />
                        </div>
                        <input className="border p-2 rounded w-full" placeholder="Location" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} required />
                        
                        <ImageUploader 
                            currentImage={newEvent.image || ''} 
                            onImageChange={(url) => setNewEvent({...newEvent, image: url})} 
                            label="Event Image"
                        />
                        
                        <textarea className="border p-2 rounded w-full" placeholder="Description" rows={3} value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                        <button type="submit" disabled={isSubmitting} className="bg-school-900 text-white px-4 py-2 rounded hover:bg-school-800 w-full flex justify-center">
                            {isSubmitting ? <Loader2 className="animate-spin" /> : "Publish Event"}
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map(event => (
                        <div key={event.id} className="border rounded-lg p-4 bg-white shadow-sm flex flex-col justify-between">
                            <div className="flex gap-4">
                                <img src={event.image} alt={event.title} className="w-16 h-16 object-cover rounded bg-gray-100" />
                                <div>
                                    <h4 className="font-bold text-lg">{event.title}</h4>
                                    <p className="text-sm text-gray-500">{event.date} | {event.location}</p>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1">
                                    <Trash2 className="w-4 h-4" /> Delete Event
                                </button>
                            </div>
                        </div>
                    ))}
                    {events.length === 0 && <p className="text-gray-500 italic">No events in database.</p>}
                </div>
            </div>
        );

      case 'shop':
        return (
            <div className="space-y-12">
                {/* ORDER MANAGEMENT SECTION */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-school-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Package className="w-5 h-5 text-school-900" /> Customer Orders ({orders.length})
                        </h3>
                        <button onClick={() => db.getOrders().then(setOrders)} className="text-sm text-school-900 hover:underline">Refresh Orders</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic">No orders received yet.</td>
                                    </tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.id} className={order.status === 'Completed' ? 'bg-gray-50 opacity-60' : ''}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                <div>{order.customerName}</div>
                                                <div className="text-xs text-gray-500">{order.customerEmail}</div>
                                                <div className="text-xs text-gray-500">{order.customerPhone}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <ul className="list-disc list-inside">
                                                    {order.items.map((item, idx) => (
                                                        <li key={idx}>{item.name} (x{item.quantity})</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${order.totalAmount.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                {order.status !== 'Completed' && (
                                                    <button onClick={() => handleCompleteOrder(order.id)} className="text-green-600 hover:text-green-900" title="Mark Completed"><CheckCircle className="w-5 h-5"/></button>
                                                )}
                                                <button onClick={() => handleDeleteOrder(order.id)} className="text-red-600 hover:text-red-900" title="Delete Order"><Trash2 className="w-5 h-5"/></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PRODUCT MANAGEMENT SECTION */}
                <div className="space-y-6 border-t-4 border-school-100 pt-8">
                    <h2 className="text-2xl font-bold text-gray-900">Manage Shop Products</h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-school-gold" /> Add Product
                        </h3>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input className="border p-2 rounded" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                                <input className="border p-2 rounded" type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input className="border p-2 rounded" placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                                <div className="col-span-1"></div>
                            </div>
                            <ImageUploader 
                                currentImage={newProduct.image || ''} 
                                onImageChange={(url) => setNewProduct({...newProduct, image: url})} 
                                label="Product Image"
                            />
                            <button type="submit" className="bg-school-900 text-white px-4 py-2 rounded hover:bg-school-800 w-full">Add Product</button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {shopItems.map(product => (
                            <div key={product.id} className="border rounded-lg p-4 bg-white shadow-sm">
                                <img src={product.image} alt={product.name} className="w-full h-32 object-contain bg-gray-50 rounded mb-2" />
                                <h4 className="font-bold">{product.name}</h4>
                                <p className="text-sm text-gray-500 mb-2">${product.price}</p>
                                
                                <div className="mb-3">
                                    <ImageUploader 
                                        currentImage={product.image}
                                        onImageChange={(url) => handleUpdateProductImage(product.id, url)}
                                        label="Update Image"
                                    />
                                </div>

                                <button onClick={() => handleDeleteProduct(product.id)} className="w-full text-red-600 hover:text-red-800 text-sm flex items-center justify-center gap-1 border border-red-200 rounded py-1 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" /> Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <SaveButton />
            </div>
        );

      case 'committee':
        return (
            <div className="space-y-8">
                {/* Leadership Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-school-gold" /> Add Leader
                    </h3>
                    <form onSubmit={handleAddLeader} className="space-y-4 mb-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="border p-2 rounded" placeholder="Name" value={newLeader.name} onChange={e => setNewLeader({...newLeader, name: e.target.value})} required />
                            <input className="border p-2 rounded" placeholder="Role (e.g. President)" value={newLeader.role} onChange={e => setNewLeader({...newLeader, role: e.target.value})} required />
                         </div>
                        
                        <ImageUploader 
                            currentImage={newLeader.image || ''}
                            onImageChange={(url) => setNewLeader({...newLeader, image: url})}
                            label="Leader Photo"
                        />

                        <input className="border p-2 rounded w-full" placeholder="Bio (Short)" value={newLeader.bio} onChange={e => setNewLeader({...newLeader, bio: e.target.value})} />
                        <button type="submit" className="bg-school-900 text-white px-4 py-2 rounded hover:bg-school-800 w-full">Add to Leadership</button>
                    </form>

                    <div className="space-y-4 mt-8 border-t pt-6">
                        <h4 className="font-bold text-gray-700 mb-2">Current Leadership</h4>
                        {committeeLeadership.map((leader, idx) => (
                            <div key={idx} className="flex gap-4 p-4 border rounded bg-gray-50 items-start">
                                <img src={leader.image} alt={leader.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-bold">{leader.name}</p>
                                            <p className="text-xs text-school-900 font-semibold">{leader.role}</p>
                                        </div>
                                        <button onClick={() => handleDeleteLeader(idx)} className="text-red-500 hover:text-red-700">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <ImageUploader 
                                            currentImage={leader.image}
                                            onImageChange={(url) => handleUpdateLeaderImage(idx, url)}
                                            label="Update Photo"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* General Members Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                     <h3 className="text-lg font-bold text-gray-900 mb-4">Executive Members List</h3>
                     <div className="flex gap-2 mb-4">
                        <input 
                            className="border p-2 rounded flex-1" 
                            placeholder="Member Name" 
                            value={generalMemberInput}
                            onChange={(e) => setGeneralMemberInput(e.target.value)}
                        />
                        <button onClick={handleAddGeneralMember} className="bg-school-900 text-white px-4 rounded hover:bg-school-800">Add</button>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {committeeMembersList.map((member, idx) => (
                            <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2 border">
                                {member}
                                <button onClick={() => handleDeleteGeneralMember(idx)} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3"/></button>
                            </span>
                        ))}
                     </div>
                </div>
                <SaveButton />
            </div>
        );

      case 'website':
        return (
            <div className="space-y-8">
                {/* Branding Edit */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-school-gold" /> Branding & Logo
                    </h3>
                    <div className="flex gap-6 items-start">
                        <div className="flex-1 space-y-4">
                            <ImageUploader 
                                currentImage={branding.logo}
                                onImageChange={(url) => setBranding({...branding, logo: url})}
                                label="Logo"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Abbreviation</label>
                                    <input className="border p-2 rounded w-full" value={branding.name} onChange={e => setBranding({...branding, name: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input className="border p-2 rounded w-full" value={branding.fullName} onChange={e => setBranding({...branding, fullName: e.target.value})} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Edit */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Edit3 className="w-5 h-5 text-school-gold" /> Edit Homepage Hero
                    </h3>
                    <div className="space-y-4">
                         <ImageUploader 
                            currentImage={heroContent.image}
                            onImageChange={(url) => setHeroContent({...heroContent, image: url})}
                            label="Hero Banner Image"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Main Title</label>
                                <input className="border p-2 rounded w-full" value={heroContent.title} onChange={e => setHeroContent({...heroContent, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Highlight Text</label>
                                <input className="border p-2 rounded w-full" value={heroContent.highlight} onChange={e => setHeroContent({...heroContent, highlight: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea className="border p-2 rounded w-full" rows={3} value={heroContent.description} onChange={e => setHeroContent({...heroContent, description: e.target.value})} />
                        </div>
                    </div>
                </div>

                {/* Gallery & Video Edit */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Video className="w-5 h-5 text-school-gold" /> Gallery & Video
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">YouTube Video URL</label>
                            <input 
                                className="border p-2 rounded w-full" 
                                value={galleryContent.videoUrl} 
                                onChange={e => setGalleryContent({...galleryContent, videoUrl: e.target.value})}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Photos (4 Images)</label>
                            <div className="grid grid-cols-2 gap-4">
                                {[0, 1, 2, 3].map((idx) => (
                                    <ImageUploader 
                                        key={idx}
                                        currentImage={galleryContent.images[idx] || ''}
                                        onImageChange={(url) => {
                                            const newImages = [...galleryContent.images];
                                            newImages[idx] = url;
                                            setGalleryContent({...galleryContent, images: newImages});
                                        }}
                                        label={`Photo ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & News Edit */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Edit3 className="w-5 h-5 text-school-gold" /> Edit Mission & News
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mission Statement</label>
                            <textarea className="border p-2 rounded w-full" rows={4} value={missionContent.text} onChange={e => setMissionContent({...missionContent, text: e.target.value})} />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">Latest News Ticker</label>
                             {missionContent.latestNews.map((news, idx) => (
                                 <div key={idx} className="flex gap-2 mb-2">
                                     <input 
                                        className="border p-2 rounded flex-grow" 
                                        value={news.title} 
                                        onChange={(e) => {
                                            const newNews = [...missionContent.latestNews];
                                            newNews[idx].title = e.target.value;
                                            setMissionContent({...missionContent, latestNews: newNews});
                                        }}
                                     />
                                     <input 
                                        className="border p-2 rounded w-32" 
                                        value={news.date} 
                                        onChange={(e) => {
                                            const newNews = [...missionContent.latestNews];
                                            newNews[idx].date = e.target.value;
                                            setMissionContent({...missionContent, latestNews: newNews});
                                        }}
                                     />
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>

                {/* Contact Us Edit */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-school-gold" /> Edit Contact Info
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input className="border p-2 rounded w-full" value={contactInfo.email} onChange={e => setContactInfo({...contactInfo, email: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input className="border p-2 rounded w-full" value={contactInfo.phone} onChange={e => setContactInfo({...contactInfo, phone: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Website</label>
                            <input className="border p-2 rounded w-full" value={contactInfo.website} onChange={e => setContactInfo({...contactInfo, website: e.target.value})} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Physical Address</label>
                            <input className="border p-2 rounded w-full" value={contactInfo.address} onChange={e => setContactInfo({...contactInfo, address: e.target.value})} />
                        </div>
                    </div>
                </div>

                <SaveButton />
            </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-serif">Admin Dashboard</h2>
            <p className="text-gray-500">Manage your association's digital presence</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
                <nav className="space-y-2">
                    <button 
                        onClick={() => setActiveTab('membership')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'membership' ? 'bg-school-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users className="w-5 h-5 mr-3" /> Membership
                    </button>
                    <button 
                        onClick={() => setActiveTab('website')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'website' ? 'bg-school-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Layout className="w-5 h-5 mr-3" /> Edit Website
                    </button>
                    <button 
                        onClick={() => setActiveTab('database')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'database' ? 'bg-school-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Database className="w-5 h-5 mr-3" /> Event Database
                    </button>
                    <button 
                        onClick={() => setActiveTab('committee')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'committee' ? 'bg-school-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Briefcase className="w-5 h-5 mr-3" /> Committee
                    </button>
                    <button 
                        onClick={() => setActiveTab('shop')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'shop' ? 'bg-school-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        <ShoppingBag className="w-5 h-5 mr-3" /> Shop & Orders
                    </button>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
                {renderTabContent()}
            </div>
        </div>
    </div>
  );
};