import React from 'react';
import { Target, Heart, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Ourjurney = () => {
  return (
    <div className="bg-gray-50 font-sans text-[#1a233b]">

      {/* ================= OUR STORY ================= */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="bg-orange-100 text-[#f9a826] px-4 py-1 rounded-full text-sm font-bold">
            Our Story
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Building the Future of <span className="text-[#f9a826]">Learning</span>
          </h2>

          <div className="text-gray-600 text-lg space-y-4 leading-relaxed">
            <p>
              TuitionHub was founded in 2024 with a simple idea: everyone deserves
              access to quality education.
            </p>
            <p>
              Our platform bridges the gap between students seeking help and tutors
              wanting to share their knowledge.
            </p>
            <p>
              Today, we're proud to serve thousands of students and tutors across
              the country.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <StatCard number="50K+" label="Students Helped" />
          <StatCard number="2,500+" label="Expert Tutors" />
          <StatCard number="100+" label="Subjects Covered" />
          <StatCard number="98%" label="Satisfaction Rate" />
        </motion.div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="max-w-7xl mx-auto py-20 px-6 text-center">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-4"
        >
          <span className="bg-orange-100 text-[#f9a826] px-4 py-1 rounded-full text-sm font-bold">
            What We Stand For
          </span>

          <h2 className="text-4xl font-extrabold">
            Our Core <span className="text-[#f9a826]">Values</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6"
        >
          <ValueCard
            icon={<Target className="w-8 h-8 text-[#f9a826]" />}
            title="Our Mission"
            desc="To democratize education by connecting students with the best tutors."
          />
          <ValueCard
            icon={<Heart className="w-8 h-8 text-[#f9a826]" />}
            title="Our Values"
            desc="Transparency, quality, and student success guide everything we do."
          />
          <ValueCard
            icon={<Users className="w-8 h-8 text-[#f9a826]" />}
            title="Our Community"
            desc="A growing network of passionate educators and eager learners."
          />
          <ValueCard
            icon={<ShieldCheck className="w-8 h-8 text-[#f9a826]" />}
            title="Our Standards"
            desc="Every tutor is verified to ensure top-quality instruction."
          />
        </motion.div>
      </section>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({ number, label }) => (
  <motion.div
    variants={fadeUp}
    transition={{ duration: 0.5 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
  >
    <h3 className="text-3xl font-bold text-[#f9a826] mb-1">{number}</h3>
    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
      {label}
    </p>
  </motion.div>
);

const ValueCard = ({ icon, title, desc }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.4 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4"
  >
    <div className="bg-orange-50 p-4 rounded-xl">
      {icon}
    </div>
    <h4 className="text-xl font-bold">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default Ourjurney;
