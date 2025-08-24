import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, Shield, ArrowRight, Star, Target, Award } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <nav className="bg-gray-900/50 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-white">KickBox Pro</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Professional Kickboxing
            <span className="text-red-500"> Competition Management</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Streamline your kickboxing tournaments with our comprehensive platform. 
            From fighter registration to bracket generation, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/demo"
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need to Run Competitions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl">
              <Users className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Team Management</h3>
              <p className="text-gray-400">
                Register teams, manage fighters, and track athlete information all in one place.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl">
              <Trophy className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Bracket Generation</h3>
              <p className="text-gray-400">
                Automatically generate brackets based on weight, age, and experience categories.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl">
              <Calendar className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Live Event Management</h3>
              <p className="text-gray-400">
                Run competitions smoothly with real-time updates and match progression tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <Star className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-1">Multiple Competition Styles</h4>
                <p className="text-gray-400">Support for Full Contact, Light Contact, Kick Light, and Point Fighting</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Target className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-1">Flexible Categories</h4>
                <p className="text-gray-400">Custom age, weight, and experience categories</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Award className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-1">Automated Seeding</h4>
                <p className="text-gray-400">Smart fighter placement based on rankings and experience</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-1">Role-Based Access</h4>
                <p className="text-gray-400">Secure access control for organizers, managers, and officials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 KickBox Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;