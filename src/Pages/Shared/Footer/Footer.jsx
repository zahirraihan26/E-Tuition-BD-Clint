import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGraduationCap } from "react-icons/fa";
import { FaMapMarkerAlt } from 'react-icons/fa'; // Location icon
import { IoIosMailOpen } from 'react-icons/io';
import { IoCallSharp } from 'react-icons/io5';

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content px-10 py-16 transition-all duration-500 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Logo & Description */}
                <div>
                    <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
                        <div className="bg-primary text-black p-2.5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform duration-300">
                            <FaGraduationCap size={22} />
                        </div>
                        <span className="font-extrabold text-2xl tracking-tighter text-neutral-content">
                            E <span className="text-primary italic">Tuition</span>
                        </span>
                    </div>
                    <p className="text-neutral-content/70 text-sm leading-relaxed max-w-xs font-medium">
                        The #1 platform for connecting students with expert tutors. Empowering education through personalized learning.
                    </p>
                    <div className="flex space-x-3 mt-4">
                        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                            <Icon
                                key={index}
                                className="w-8 h-8 p-2 bg-neutral-content/10 rounded-full hover:bg-primary hover:text-primary-content transition-all cursor-pointer border border-neutral-content/10"
                            />
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="font-bold mb-4 text-neutral-content uppercase tracking-wider text-xs">Quick Links</h2>
                    <ul className="space-y-2 text-neutral-content/70 text-sm">
                        <li className="hover:text-primary cursor-pointer transition-colors">Home</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Find Tuitions</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Browse Tutors</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">About Us</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Contact</li>
                    </ul>
                </div>

                {/* For Students */}
                <div>
                    <h2 className="font-bold mb-4 text-neutral-content uppercase tracking-wider text-xs">For Students</h2>
                    <ul className="space-y-2 text-neutral-content/70 text-sm">
                        <li className="hover:text-primary cursor-pointer transition-colors">Post a Tuition Request</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Find a Tutor</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">How It Works</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Student FAQ</li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h2 className="font-bold mb-4 text-neutral-content uppercase tracking-wider text-xs">Contact Us</h2>
                    <ul className="space-y-3 text-neutral-content/70 text-sm">
                        <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-primary" /> 123 Education Street, Learning City, LC 12345</li>
                        <li className="flex items-center gap-3"><IoCallSharp className="text-primary" /> +88 01615734276</li>
                        <li className="flex items-center gap-3"><IoIosMailOpen className="text-primary" /> hello@etuition.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-neutral-content/10 pt-6 flex flex-col md:flex-row justify-between text-neutral-content/50 text-xs">
                <p>© 2025 E Tuition. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
