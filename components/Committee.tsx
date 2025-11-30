
import React from 'react';
import { CommitteeMember } from '../types';

interface CommitteeProps {
  leadership: CommitteeMember[];
  membersList: string[];
}

export const Committee: React.FC<CommitteeProps> = ({ leadership, membersList }) => {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-school-900 font-serif sm:text-4xl">Administrative Committee</h2>
          <p className="mt-4 text-xl text-gray-500">
            Meet the dedicated team working behind the scenes for MSVOSA.
          </p>
        </div>

        {/* Executive Roles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          {leadership.map((person, index) => (
            <div key={`${person.role}-${index}`} className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-school-100 transition-colors duration-300 group">
              <div className="relative">
                <img 
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300" 
                    src={person.image} 
                    alt={person.name} 
                />
                <div className="absolute bottom-4 right-0 bg-school-gold w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{person.name}</h3>
              <span className="text-school-900 font-bold text-[10px] uppercase tracking-widest mb-2 bg-blue-100 px-2 py-1 rounded-full mt-2 inline-block">{person.role}</span>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">"{person.bio}"</p>
            </div>
          ))}
        </div>
        
        {/* General Members */}
        {membersList.length > 0 && (
          <div className="bg-school-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-school-800 opacity-50"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 rounded-full bg-school-gold opacity-10"></div>
              
              <div className="relative z-10">
                  <h3 className="text-2xl font-bold font-serif mb-8 text-center border-b border-school-800 pb-4 inline-block w-full">Executive Committee Members</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                      {membersList.map((name, index) => (
                          <div key={index} className="bg-school-800/50 backdrop-blur-sm rounded-lg p-3 font-medium text-sm hover:bg-school-800 transition-colors">
                              {name}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
        )}
      </div>
    </section>
  );
};
