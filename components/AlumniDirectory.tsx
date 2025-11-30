
import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, GraduationCap, MapPin, UserPlus, X } from 'lucide-react';
import { Alumni } from '../types';
import { db } from '../services/database';

export const AlumniDirectory: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [newAlumni, setNewAlumni] = useState<Partial<Alumni>>({
    name: '',
    graduationYear: new Date().getFullYear(),
    profession: '',
    location: ''
  });

  // Load data from Service
  useEffect(() => {
    db.getMembers().then(setAlumni);
  }, []);

  // Filter Logic
  const filteredAlumni = alumni.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          person.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear ? person.graduationYear.toString() === selectedYear : true;
    const matchesProfession = selectedProfession ? person.profession.toLowerCase().includes(selectedProfession.toLowerCase()) : true;

    return matchesSearch && matchesYear && matchesProfession;
  });

  // Unique lists for filter dropdowns
  const uniqueYears = Array.from(new Set(alumni.map(a => a.graduationYear))).sort((a, b) => b - a);
  const uniqueProfessions = Array.from(new Set(alumni.map(a => a.profession))).sort();

  const handleAddAlumni = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlumni.name || !newAlumni.profession) return;

    try {
        await db.addMember({
            name: newAlumni.name!,
            graduationYear: Number(newAlumni.graduationYear) || 2020,
            profession: newAlumni.profession!,
            location: newAlumni.location || 'Unknown'
        });
        
        const updatedList = await db.getMembers();
        setAlumni(updatedList);
        setShowAddForm(false);
        setNewAlumni({ name: '', graduationYear: new Date().getFullYear(), profession: '', location: '' });
    } catch (error) {
        alert("Could not add member. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">Alumni Directory</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Find batchmates, network with professionals, and reconnect with friends.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-school-900 focus:border-school-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select 
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-school-900 focus:border-school-900 appearance-none bg-white"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select 
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-school-900 focus:border-school-900 appearance-none bg-white"
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
              >
                <option value="">All Professions</option>
                {uniqueProfessions.map(prof => (
                  <option key={prof} value={prof}>{prof}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center text-sm text-school-900 hover:text-school-800 font-medium"
            >
              <UserPlus className="w-4 h-4 mr-1" /> Add yourself to directory
            </button>
          </div>
        </div>

        {/* Modal for Adding Member */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
              <button 
                onClick={() => setShowAddForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-xl font-bold mb-4 text-school-900">Add to Directory</h3>
              <form onSubmit={handleAddAlumni} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input required type="text" className="mt-1 w-full border rounded p-2" 
                    value={newAlumni.name} onChange={e => setNewAlumni({...newAlumni, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input required type="number" className="mt-1 w-full border rounded p-2" 
                      value={newAlumni.graduationYear} onChange={e => setNewAlumni({...newAlumni, graduationYear: parseInt(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profession</label>
                    <input required type="text" className="mt-1 w-full border rounded p-2" 
                      value={newAlumni.profession} onChange={e => setNewAlumni({...newAlumni, profession: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Location</label>
                  <input required type="text" className="mt-1 w-full border rounded p-2" 
                    value={newAlumni.location} onChange={e => setNewAlumni({...newAlumni, location: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-school-900 text-white py-2 rounded hover:bg-school-800">Save Profile</button>
              </form>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((person) => (
              <div key={person.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-school-100 flex items-center justify-center text-school-900 font-bold text-lg">
                    {person.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold text-gray-900 truncate">{person.name}</p>
                  <p className="text-sm text-school-gold font-medium flex items-center mb-2">
                    <GraduationCap className="w-3 h-3 mr-1" /> Class of {person.graduationYear}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 flex items-center">
                      <Briefcase className="w-3.5 h-3.5 mr-2 text-gray-400" /> {person.profession}
                    </p>
                    {person.location && (
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-2 text-gray-400" /> {person.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No alumni found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedYear(''); setSelectedProfession('');}}
                className="mt-2 text-school-900 font-medium underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
