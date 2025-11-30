import React from 'react';
import { GalleryContent } from '../types';
import { Play } from 'lucide-react';

interface MultimediaProps {
  content: GalleryContent;
}

export const Multimedia: React.FC<MultimediaProps> = ({ content }) => {
  // Helper to extract YouTube ID or get Embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url; 
  };

  return (
    <div className="bg-school-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white font-serif mb-2">Our Moments</h2>
            <div className="h-1 w-20 bg-school-gold mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side: Video Player */}
          <div className="w-full">
            <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl border-4 border-school-800 bg-black">
               <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getEmbedUrl(content.videoUrl)}
                title="School Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 flex items-center justify-center text-blue-200 text-sm">
                <Play className="w-4 h-4 mr-2" /> Watch Highlights
            </div>
          </div>

          {/* Right Side: Photo Grid */}
          <div className="grid grid-cols-2 gap-3 h-full">
            {content.images.slice(0, 4).map((img, idx) => (
              <div 
                key={idx} 
                className={`rounded-xl overflow-hidden shadow-lg border border-school-800 group relative ${idx === 0 ? 'row-span-2 h-full' : 'h-48'}`}
              >
                <img 
                    src={img} 
                    alt={`Gallery ${idx + 1}`} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-school-900/0 group-hover:bg-school-900/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};