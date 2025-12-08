import React from 'react';

const Future = () => {
    return (
        <section className=" py-16 px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center font-sans bg-white">
            
            {/* Left Content Area */}
            <div className="space-y-6">
                {/* Badge */}
                <span className="inline-block bg-orange-100 text-[#f9a826] px-4 py-1 rounded-full text-sm font-bold">
                    Our Story
                </span>
                
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a233b] leading-tight">
                    Building the Future of <span className="text-[#f9a826]">Learning</span>
                </h2>
                
                {/* Description paragraphs */}
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

            {/* Right Stats Grid Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatBox number="50K+" label="Students Helped" />
                <StatBox number="2,500+" label="Expert Tutors" />
                <StatBox number="100+" label="Subjects Covered" />
                <StatBox number="98%" label="Satisfaction Rate" />
            </div>
        </section>
    );
};

/* Internal reusable component for each Stat card */
const StatBox = ({ number, label }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
            <h3 className="text-3xl font-extrabold text-[#f9a826] mb-2">{number}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-wide uppercase">{label}</p>
        </div>
    );
};

export default Future;