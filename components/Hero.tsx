
import React from 'react';
import { ViewState, HeroContent } from '../types';

interface HeroProps {
  setView: (view: ViewState) => void;
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ setView, content }) => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-serif">
                <span className="block xl:inline">{content.title}</span>{' '}
                <span className="block text-school-900">{content.highlight}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {content.description}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => setView('membership')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-school-900 hover:bg-school-800 md:py-4 md:text-lg transition-colors"
                  >
                    Become a Member
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => setView('events')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-school-900 bg-school-100 hover:bg-blue-200 md:py-4 md:text-lg transition-colors"
                  >
                    View Events
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={content.image}
          alt="School building"
        />
        <div className="absolute inset-0 bg-school-900 opacity-20 lg:hidden"></div>
      </div>
    </div>
  );
};
