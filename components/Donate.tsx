
import React, { useState } from 'react';
import { Heart, CreditCard, School, BookOpen, Trophy, Copy, Check } from 'lucide-react';

export const Donate: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const causes = [
    {
      id: 'scholarship',
      title: 'Scholarship Fund',
      description: 'Support bright students who need financial assistance to pursue their education. Your contribution helps shape the future.',
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-50 border-blue-100',
      textColor: 'text-blue-600'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Development',
      description: 'Help us renovate classrooms, science labs, and the school library to provide a better learning environment.',
      icon: <School className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50 border-green-100',
      textColor: 'text-green-600'
    },
    {
      id: 'sports',
      title: 'Sports & Activities',
      description: 'Provide sports equipment, uniforms, and funding for extracurricular activities to nurture talent.',
      icon: <Trophy className="w-8 h-8 text-orange-600" />,
      color: 'bg-orange-50 border-orange-100',
      textColor: 'text-orange-600'
    },
    {
      id: 'general',
      title: 'General Association Fund',
      description: 'Support the day-to-day operations of MSVOSA, alumni events, and community outreach programs.',
      icon: <Heart className="w-8 h-8 text-red-600" />,
      color: 'bg-red-50 border-red-100',
      textColor: 'text-red-600'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heart className="w-16 h-16 text-school-gold mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
            Make a Difference
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Your generous contributions help us maintain the legacy of our school and support the next generation of students.
          </p>
        </div>

        {/* Donation Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {causes.map((cause) => (
            <div key={cause.id} className={`rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow ${cause.color}`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-white p-3 rounded-full shadow-sm">
                  {cause.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${cause.textColor} mb-2`}>{cause.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{cause.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Details Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 max-w-4xl mx-auto">
          <div className="bg-school-900 p-6 text-white text-center">
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
              <CreditCard className="w-6 h-6" /> Donation Methods
            </h3>
            <p className="opacity-80 mt-2">Please use the details below to transfer your donation.</p>
          </div>
          
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Bank Transfer</h4>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span>Bank Name:</span>
                  <span className="font-bold text-gray-900">National School Bank</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span>Account Name:</span>
                  <span className="font-bold text-gray-900">MSVOSA Fund</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span>Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">1234-5678-9012</span>
                    <button onClick={() => handleCopy('1234-5678-9012')} className="text-school-900 hover:text-school-700">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span>Branch:</span>
                  <span className="font-bold text-gray-900">Main City Branch</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span>SWIFT / BIC:</span>
                  <span className="font-bold text-gray-900">NSBKUS33</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center space-y-6">
              <div className="bg-school-100 rounded-full p-6">
                 <Heart className="w-12 h-12 text-school-900" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Confirmation</h4>
                <p className="text-gray-500 mt-2 text-sm">
                  After making a transfer, please email the receipt to <strong className="text-school-900">treasurer@msvosa.org</strong> with your name and the category you wish to support.
                </p>
              </div>
              <button className="w-full bg-school-900 text-white py-3 rounded-lg font-bold hover:bg-school-800 transition-colors shadow-lg">
                Contact Treasurer
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-400 text-sm">
            <p>MSVOSA is a registered non-profit organization.</p>
        </div>
      </div>
    </div>
  );
};
