import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaComments,
  FaPaperPlane,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Contactus = () => {
  return (
    <div className="bg-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#0F1B36] py-24 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Get in <span className="text-yellow-400">Touch</span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </motion.div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="min-h-screen px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* -------- LEFT INFO -------- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Let’s Start a Conversation
            </h2>

            <p className="text-gray-600 max-w-md mb-10">
              Whether you're a student looking for the perfect tutor or a tutor
              wanting to join our platform, we're here to help you succeed.
            </p>

            {/* Info Item */}
            {[
              {
                icon: <FaEnvelope size={20} />,
                title: "Email Us",
                line1: "hello@tuitionhub.com",
                line2: "support@tuitionhub.com",
              },
              {
                icon: <FaPhoneAlt size={20} />,
                title: "Call Us",
                line1: "+1 (234) 567-890",
                line2: "Mon–Fri, 9am–6pm",
              },
              {
                icon: <FaMapMarkerAlt size={20} />,
                title: "Visit Us",
                line1: "123 Education Street",
                line2: "Learning City, LC 12345",
              },
              {
                icon: <FaComments size={20} />,
                title: "Live Chat",
                line1: "Available 24/7",
                line2: "for urgent queries",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-start gap-4 mb-6 cursor-pointer"
              >
                <div className="bg-yellow-100 text-yellow-500 p-3 rounded-xl">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600">{item.line1}</p>
                  <p className="text-gray-600">{item.line2}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* -------- RIGHT FORM -------- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h3>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />

              <input
                type="text"
                placeholder="How can we help?"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />

              <textarea
                rows="5"
                placeholder="Tell us more about your inquiry..."
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl shadow-md"
              >
                <FaPaperPlane /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
