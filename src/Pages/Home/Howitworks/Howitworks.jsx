import React from 'react';
import { MdPersonAdd, MdSearch, MdMessage, MdCheckCircle } from 'react-icons/md';
import { motion } from 'framer-motion';

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

  // container animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // card animation
  const card = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-base-content leading-tight tracking-tight"
        >
          The Smart Way to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Learn & Teach</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base-content/70 text-lg mb-14 max-w-2xl mx-auto"
        >
          Get started in minutes with our simple, streamlined process designed for students and tutors.
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ scale: 1.05 }}
              className="
                relative p-8 pt-16 rounded-3xl
                bg-base-100/40 backdrop-blur-2xl
                shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]
                transition-all duration-500
                border border-white/5
                hover:border-primary/30
                group
              "
            >
          

              {/* Icon */}
              <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-base-content mb-2">
                {step.title}
              </h3>

              <p className="text-base-content/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
