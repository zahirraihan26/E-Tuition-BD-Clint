import React from 'react';
import { MdPersonAdd, MdSearch, MdMessage, MdCheckCircle } from 'react-icons/md';

const HowItWorks = () => {
  const steps = [
    {
     
      icon: <MdPersonAdd className="w-8 h-8 text-orange-500" />,
      title: "Create Account",
      description: "Sign up as a student or tutor in just a few clicks. It's completely free to get started.",
    },
    {
    
      icon: <MdSearch className="w-8 h-8 text-orange-500" />,
      title: "Post or Browse",
      description: "Students post tuition requests, tutors browse and apply to opportunities that match their expertise.",
    },
    {
      
      icon: <MdMessage className="w-8 h-8 text-orange-500" />,
      title: "Connect & Agree",
      description: "Review applications, chat with tutors, and agree on terms that work for both parties.",
    },
    {

      icon: <MdCheckCircle className="w-8 h-8 text-orange-500" />,
      title: "Start Learning",
      description: "Begin your tutoring sessions with secure payments and track your progress along the way.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          How It <span className="text-orange-500">Works</span>
        </h2>

        <p className="text-gray-600 text-lg mb-14 max-w-2xl mx-auto">
          Get started in minutes with our simple, streamlined process designed for students and tutors.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {steps.map((step, index) => (
            <div
              key={index}
              className="
                relative p-8 pt-16 rounded-2xl
                bg-white/60 backdrop-blur-xl
                shadow-lg hover:shadow-2xl 
                transition-all duration-300 
                border border-transparent 
                hover:border-orange-400/50
                hover:-translate-y-2
              "
            >
              {/* Number Badge */}
              

              {/* Icon Wrapper */}
              <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center shadow-sm">
                {step.icon}
              </div>

              {/* Text */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
