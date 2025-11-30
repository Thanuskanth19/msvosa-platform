
import React, { useRef, useState } from 'react';
import { Upload, Link, Image as ImageIcon, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (newUrl: string) => void;
  label?: string;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageChange, label = "Image", className = "" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputType, setInputType] = useState<'upload' | 'url'>('upload');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    // Resize and compress image on client side
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG with 0.7 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        onImageChange(dataUrl);
        setIsProcessing(false);
      };
    };
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="flex gap-4 items-start">
        {/* Preview Area */}
        <div className="relative group w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg border overflow-hidden flex items-center justify-center">
          {currentImage ? (
            <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-400" />
          )}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-3">
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => setInputType('upload')}
              className={`px-3 py-1 rounded-full border ${inputType === 'upload' ? 'bg-school-900 text-white border-school-900' : 'bg-white text-gray-600 border-gray-300'}`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setInputType('url')}
              className={`px-3 py-1 rounded-full border ${inputType === 'url' ? 'bg-school-900 text-white border-school-900' : 'bg-white text-gray-600 border-gray-300'}`}
            >
              Paste URL
            </button>
          </div>

          {inputType === 'upload' ? (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full justify-center"
              >
                <Upload className="w-4 h-4" />
                Choose Photo
              </button>
              <p className="text-[10px] text-gray-500 mt-1">Max size: 800px (Auto-resized)</p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={currentImage}
                onChange={(e) => onImageChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-school-900 focus:border-school-900"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
