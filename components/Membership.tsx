import React, { useState } from 'react';
import { User, Mail, Calendar, Briefcase, Award } from 'lucide-react';

export const Membership: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a backend
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow text-center">
          <Award className="mx-auto h-16 w-16 text-school-gold" />
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Aboard!</h2>
          <p className="text-gray-500">
            Thank you for registering with MSVOSA. We have sent a confirmation email with your digital membership card details.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-4 text-school-900 hover:text-school-800 font-medium underline"
          >
            Register another alumnus
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <User className="h-12 w-12 text-school-900" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-serif">
          Join MSVOSA
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Reconnect, Give Back, Belong.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="focus:ring-school-900 focus:border-school-900 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="focus:ring-school-900 focus:border-school-900 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                    Graduation Year
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    id="year"
                    name="year"
                    type="number"
                    min="1950"
                    max="2024"
                    required
                    className="focus:ring-school-900 focus:border-school-900 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                    placeholder="2015"
                    />
                </div>
                </div>
                <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                    Profession
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    id="profession"
                    name="profession"
                    type="text"
                    className="focus:ring-school-900 focus:border-school-900 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                    placeholder="Engineer"
                    />
                </div>
                </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-school-900 hover:bg-school-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-school-900"
              >
                Register Membership
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already a member?
                </span>
              </div>
            </div>

            <div className="mt-6">
                <button className="w-full flex justify-center py-2 px-4 border border-school-900 rounded-md shadow-sm text-sm font-medium text-school-900 bg-white hover:bg-gray-50">
                    Log in
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};