import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Anika Rahman",
      role: "Student",
      image: "https://i.pravatar.cc/150?u=anika",
      text: "E-Tuition-BD has completely changed the way I learn. Finding a qualified Math tutor was so easy, and my grades have improved significantly!",
      rating: 5,
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      id: 2,
      name: "Zayan Ahmed",
      role: "Parent",
      image: "https://i.pravatar.cc/150?u=zayan",
      text: "As a busy parent, finding the right tutor for my son was a challenge. This platform made it effortless. The verified tutor system gives me peace of mind.",
      rating: 5,
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      id: 3,
      name: "Dr. Sumaiya Khan",
      role: "Tutor",
      image: "https://i.pravatar.cc/150?u=sumaiya",
      text: "Teaching on this platform is a joy. The interface is intuitive, and it connects me with students who are genuinely eager to learn. Highly recommended!",
      rating: 4,
      color: "from-amber-500/20 to-orange-500/20"
    }
  ];

  return (
    <section className="py-32 bg-base-100 overflow-hidden relative">
        {/* 🔹 Premium Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Mesh Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
                 style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>
        </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-sm"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>User Success Stories</span>
                </motion.div>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-6xl font-black text-base-content tracking-tighter leading-[1.1]"
                >
                    Loved by <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-accent">Thousands</span> of users
                </motion.h2>
            </div>
            
            <motion.p 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base-content/50 text-lg max-w-sm font-medium leading-relaxed"
            >
                Don't just take our word for it. Hear from the students, parents, and tutors who use our platform every day.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group relative"
            >
              {/* Card Main Body */}
              <div className="h-full bg-base-200/40 backdrop-blur-3xl border border-base-content/5 p-10 rounded-[3rem] shadow-2xl transition-all duration-500 group-hover:shadow-primary/10 group-hover:border-primary/20 flex flex-col relative overflow-hidden">
                
                {/* Decorative Gradient Blob */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${review.color} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                {/* Rating & Quote */}
                <div className="flex justify-between items-start mb-10">
                    <div className="flex gap-1.5 p-2 px-3 rounded-2xl bg-base-100/50 border border-base-content/5 backdrop-blur-md">
                        {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-xs ${i < review.rating ? 'text-amber-400' : 'text-base-content/10'}`} />
                        ))}
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                        <FaQuoteLeft className="text-xl" />
                    </div>
                </div>

                {/* Text Content */}
                <p className="text-lg md:text-xl text-base-content/80 leading-relaxed font-medium mb-10 flex-grow italic">
                  "{review.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-5 border-t border-base-content/5 pt-8">
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img 
                            src={review.image} 
                            alt={review.name} 
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-500 relative z-10"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-[4px] border-base-200 z-20"></div>
                    </div>
                    <div>
                        <h4 className="font-black text-xl text-base-content group-hover:text-primary transition-colors tracking-tight">{review.name}</h4>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">{review.role}</p>
                        </div>
                    </div>
                </div>
              </div>

              {/* Background Accent Shadow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-[3.5rem] -z-10 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* 🔹 Footer Tagline */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-24 text-center"
        >
            <div className="inline-flex items-center gap-4 p-1 pl-1 pr-6 rounded-full bg-base-200/50 border border-base-content/5 backdrop-blur-sm group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <img key={i} className="w-8 h-8 rounded-full border-2 border-base-200" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-base-200 bg-primary flex items-center justify-center text-[10px] font-bold text-black">
                        +2k
                    </div>
                </div>
                <p className="text-sm font-bold text-base-content/60">
                    Joined by <span className="text-base-content">2,000+</span> happy learners this month
                </p>
                <FaChevronRight className="w-3 h-3 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
