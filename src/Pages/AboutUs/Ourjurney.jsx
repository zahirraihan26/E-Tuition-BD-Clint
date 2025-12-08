import React from 'react';
import { Target, Heart, Users, ShieldCheck } from 'lucide-react'; 

const Ourjurney = () => {
  return (
    <div className="bg-gray-50 font-sans text-[#1a233b]">
      
      {/* 1. Our Story & Stats Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="space-y-6">
          <span className="bg-orange-100 text-[#f9a826] px-4 py-1 rounded-full text-sm font-bold">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Building the Future of <span className="text-[#f9a826]">Learning</span>
          </h2>
          <div className="text-gray-600 text-lg space-y-4 leading-relaxed">
            <p>
              TuitionHub was founded in 2024 with a simple idea: everyone deserves access to quality 
              education. We noticed that finding a good tutor was often expensive, time-consuming, and frustrating.
            </p>
            <p>
              Our platform bridges the gap between students seeking help and tutors wanting to share 
              their knowledge. We've built a system that ensures quality, safety, and affordability for all.
            </p>
            <p>
              Today, we're proud to serve thousands of students and tutors across the country, and we're just getting started.
            </p>
          </div>
        </div>

        {/* Right: Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard number="50K+" label="Students Helped" />
          <StatCard number="2,500+" label="Expert Tutors" />
          <StatCard number="100+" label="Subjects Covered" />
          <StatCard number="98%" label="Satisfaction Rate" />
        </div>
      </section>

      {/* 2. Our Core Values Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 text-center">
        <div className="mb-12 space-y-4">
          <span className="bg-orange-100 text-[#f9a826] px-4 py-1 rounded-full text-sm font-bold">
            What We Stand For
          </span>
          <h2 className="text-4xl font-extrabold">
            Our Core <span className="text-[#f9a826]">Values</span>
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <ValueCard 
            icon={<Target className="w-8 h-8 text-[#f9a826]" />} 
            title="Our Mission" 
            desc="To democratize education by connecting students with the best tutors, making quality learning accessible to everyone." 
          />
          <ValueCard 
            icon={<Heart className="w-8 h-8 text-[#f9a826]" />} 
            title="Our Values" 
            desc="We believe in transparency, quality, and putting student success at the heart of everything we do." 
          />
          <ValueCard 
            icon={<Users className="w-8 h-8 text-[#f9a826]" />} 
            title="Our Community" 
            desc="A growing network of passionate educators and eager learners working together to achieve academic excellence." 
          />
          <ValueCard 
            icon={<ShieldCheck className="w-8 h-8 text-[#f9a826]" />} 
            title="Our Standards" 
            desc="Every tutor on our platform undergoes rigorous verification to ensure the highest quality of instruction." 
          />
        </div>
      </section>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ number, label }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
    <h3 className="text-3xl font-bold text-[#f9a826] mb-1">{number}</h3>
    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
  </div>
);

// Reusable Value Card
const ValueCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
    <div className="bg-orange-50 p-4 rounded-xl italic">
      {icon}
    </div>
    <h4 className="text-xl font-bold">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Ourjurney;