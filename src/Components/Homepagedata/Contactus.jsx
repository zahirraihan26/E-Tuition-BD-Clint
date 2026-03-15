import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaComments,
  FaPaperPlane,
} from "react-icons/fa";
import { MdOutlineCastForEducation } from 'react-icons/md';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Contactus = () => {
  return (
    <div className="bg-base-100 transition-colors duration-300 overflow-hidden">

      <section className="relative overflow-hidden bg-[#020617] py-24 text-white border-b border-white/5">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tag */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-xs font-black mb-6 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)] mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MdOutlineCastForEducation className="text-primary text-sm" />
              <span className="text-primary uppercase tracking-widest font-black">Get In Touch</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
              Start a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-accent">
                Conversation
              </span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed font-medium"
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible. <span className="text-white/80 italic font-bold">Personalized support made simple.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="min-h-screen px-6 py-20 bg-base-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* -------- LEFT INFO -------- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-black text-base-content tracking-tight mb-6">
              Let’s Start a Conversation
            </h2>

            <p className="text-base-content/70 max-w-md mb-12 text-lg">
              Whether you're a student looking for the perfect tutor or a tutor
              wanting to join our platform, we're here to help you succeed.
            </p>

            {/* Info Item */}
            <div className="space-y-8">
              {[
                {
                  icon: <FaEnvelope size={20} />,
                  title: "Email Us",
                  line1: "hello@etuition.com",
                  line2: "support@etuition.com",
                  color: "bg-primary/10 text-primary",
                },
                {
                  icon: <FaPhoneAlt size={20} />,
                  title: "Call Us",
                  line1: "+1 (234) 567-890",
                  line2: "Mon–Fri, 9am–6pm",
                  color: "bg-accent/10 text-accent",
                },
                {
                  icon: <FaMapMarkerAlt size={20} />,
                  title: "Visit Us",
                  line1: "123 Education Street",
                  line2: "Learning City, LC 12345",
                  color: "bg-indigo-500/10 text-indigo-500",
                },
                {
                  icon: <FaComments size={20} />,
                  title: "Live Chat",
                  line1: "Available 24/7",
                  line2: "for urgent queries",
                  color: "bg-green-500/10 text-green-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-start gap-5 cursor-pointer group"
                >
                  <div className={`${item.color} p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg shadow-black/5`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-base-content mb-1">{item.title}</h4>
                    <p className="text-base-content/60 font-medium">{item.line1}</p>
                    <p className="text-base-content/60 font-medium">{item.line2}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* -------- RIGHT FORM -------- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-base-200 rounded-[2.5rem] shadow-2xl border border-base-300 p-10 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2.6rem] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative">
              <h3 className="text-2xl font-black text-base-content mb-8 tracking-tight">
                Send us a Message
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-0 rounded-2xl font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-0 rounded-2xl font-medium"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-0 rounded-2xl font-medium"
                />

                <input
                  type="text"
                  placeholder="How can we help?"
                  className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-0 rounded-2xl font-medium"
                />

                <textarea
                  rows="4"
                  placeholder="Tell us more about your inquiry..."
                  className="textarea textarea-bordered w-full bg-base-100 focus:border-primary focus:ring-0 rounded-2xl font-medium resize-none"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn btn-primary w-full h-14 rounded-2xl font-black text-base uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                  <FaPaperPlane className="mr-2" /> Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
