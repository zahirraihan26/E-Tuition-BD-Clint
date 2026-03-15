import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Future = () => {
  return (
    <section className="py-16 px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center font-sans bg-base-100 overflow-hidden border-t border-base-300/30">
      
      {/* Left Content */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-6"
      >
        <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold">
            Our Vision
          </span>

        <h2 className="text-4xl md:text-5xl font-bold text-base-content leading-tight">
          Building the Future of <span className="text-primary">Learning</span>
        </h2>

        <div className="text-base-content/70 text-lg space-y-4 leading-relaxed">
          <p>
            TuitionHub was founded in 2024 with a simple idea: everyone deserves access to quality education.
          </p>
          <p>
            We connect students with expert tutors through a safe, affordable, and easy platform.
          </p>
          <p>
            Today, we proudly serve thousands across the country—and we’re just getting started.
          </p>
        </div>
      </motion.div>

      {/* Right Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <StatBox number="50K+" label="Students Helped" />
        <StatBox number="2,500+" label="Expert Tutors" />
        <StatBox number="100+" label="Subjects Covered" />
        <StatBox number="98%" label="Satisfaction Rate" />
      </motion.div>
    </section>
  );
};

const StatBox = ({ number, label }) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.06, y: -6 }}
      className="bg-base-100 p-8 rounded-2xl border border-base-300/50 shadow-sm flex flex-col items-center justify-center text-center transition hover:border-primary/30"
    >
      <h3 className="text-3xl font-extrabold text-primary mb-2">
        {number}
      </h3>
      <p className="text-base-content/50 font-semibold text-xs tracking-wide uppercase">
        {label}
      </p>
    </motion.div>
  );
};

export default Future;
