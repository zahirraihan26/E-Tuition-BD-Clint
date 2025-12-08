import React from 'react';

const Aboutbanner = () => {
    return (
        <section className="bg-[#1a233b] py-20 px-4 flex flex-col items-center justify-center text-center">
            {/* Title Section */}
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-[#f9a826]">TuitionHub</span>
            </h1>
            
            {/* Description Section */}
            <p className="max-w-3xl text-gray-300 text-lg md:text-xl leading-relaxed">
                We're on a mission to transform education by making personalized tutoring accessible, 
                affordable, and effective for students everywhere.
            </p>
        </section>
    );
};

export default Aboutbanner;