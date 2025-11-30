
import React from 'react';
import { Event } from '../types';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

interface EventsProps {
  events: Event[];
}

export const Events: React.FC<EventsProps> = ({ events }) => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
            Upcoming Events
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Join us for networking, celebration, and community service.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={event.image} alt={event.title} />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-school-gold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {event.date}
                      </span>
                    </p>
                    <a href="#" className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">{event.title}</p>
                      <p className="mt-3 text-base text-gray-500">{event.description}</p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="sr-only">Location</span>
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                      <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-school-900 hover:bg-school-800">
                          Register Now <ArrowRight className="ml-2 w-4 h-4"/>
                      </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No upcoming events scheduled. Check back later!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
