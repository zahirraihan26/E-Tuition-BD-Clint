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
    <section className="bg-base-200 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* 🔹 Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-xs rounded-full bg-primary/10 text-primary font-bold uppercase tracking-widest border border-primary/20 backdrop-blur-md">
            Why E Tuition
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content leading-tight tracking-tight">
            The Smart Way to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Learn & Teach</span>
          </h2>

          <p className="mt-6 text-base-content/70 max-w-xl">
            We've built a platform that prioritizes both students and tutors.
            Our features are designed to make learning effective, convenient,
            and enjoyable.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 md:gap-12 mt-12">
            {[
              { value: "50K+", label: "Success Stories" },
              { value: "100+", label: "Specialized Subjects" },
              { value: "4.9", label: "Top Rated" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-base-content to-base-content/40 mb-1">
                  {item.value}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
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
      className="
        bg-base-100/40 backdrop-blur-2xl border border-white/5 
        rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] 
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] 
        hover:border-primary/30 transition-all duration-500 group
      "
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 text-primary text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-base-content mb-3 tracking-tight">
        {title}
      </h4>
      <p className="text-base-content/60 text-sm leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
};

export default WhyTutionHub;
