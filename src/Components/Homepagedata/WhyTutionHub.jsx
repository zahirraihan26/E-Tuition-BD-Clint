import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaClock,
  FaCreditCard,
  FaHeadset,
  FaStar,
  FaGlobe,
} from "react-icons/fa";

const WhyTutionHub = () => {
  return (
    <section className="bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* 🔹 Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600 font-medium">
            Why TuitionHub
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            The Smart Way to{" "}
            <span className="text-yellow-500">Learn & Teach</span>
          </h2>

          <p className="mt-6 text-gray-600 max-w-xl">
            We've built a platform that prioritizes both students and tutors.
            Our features are designed to make learning effective, convenient,
            and enjoyable.
          </p>

          {/* Stats */}
          <div className="flex gap-12 mt-10">
            {[
              { value: "50K+", label: "Happy Students" },
              { value: "100+", label: "Subjects" },
              { value: "4.9", label: "Average Rating" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-gray-900">
                  {item.value}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 🔹 Right Features */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <FeatureCard
            icon={<FaShieldAlt />}
            title="Verified Tutors"
            text="All tutors undergo thorough background checks and verification processes."
          />
          <FeatureCard
            icon={<FaClock />}
            title="Flexible Scheduling"
            text="Learn at your own pace with tutors available around the clock."
          />
          <FeatureCard
            icon={<FaCreditCard />}
            title="Secure Payments"
            text="Stripe-powered payments with money-back guarantee for peace of mind."
          />
          <FeatureCard
            icon={<FaHeadset />}
            title="24/7 Support"
            text="Our dedicated support team is always ready to help you succeed."
          />
          <FeatureCard
            icon={<FaStar />}
            title="Quality Assured"
            text="Rating system ensures you connect with top-rated tutors only."
          />
          <FeatureCard
            icon={<FaGlobe />}
            title="Learn Anywhere"
            text="Online and in-person options to suit your learning preferences."
          />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, text }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-100 text-yellow-500 text-xl mb-4">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h4>
      <p className="text-gray-600 text-sm leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
};

export default WhyTutionHub;
