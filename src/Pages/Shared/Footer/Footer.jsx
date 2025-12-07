import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGraduationCap } from "react-icons/fa";
import { FaMapMarkerAlt } from 'react-icons/fa'; // Location icon
import { IoIosMailOpen } from 'react-icons/io';
import { IoCallSharp } from 'react-icons/io5';

const Footer = () => {
    return (
        <footer className="bg-[#1B2A4D] text-white px-10 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* Logo & Description */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-blue-900 text-white p-2 rounded-full">
                            <FaGraduationCap size={20} />
                        </div>
                        <span className="font-bold text-xl text-white">
                            Tuition<span className="text-yellow-500">Hub</span>
                        </span>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Connecting students with qualified tutors for personalized learning experiences. Your journey to academic excellence starts here.
                    </p>
                    <div className="flex space-x-3 mt-4">
                        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                            <Icon 
                                key={index} 
                                className="w-6 h-6 p-1 bg-gray-700 rounded hover:bg-yellow-500 transition-colors cursor-pointer" 
                            />
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="font-semibold mb-2 text-white">Quick Links</h2>
                    <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="hover:text-yellow-500 cursor-pointer">Home</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Find Tuitions</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Browse Tutors</li>
                        <li className="hover:text-yellow-500 cursor-pointer">About Us</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* For Students */}
                <div>
                    <h2 className="font-semibold mb-2 text-white">For Students</h2>
                    <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="hover:text-yellow-500 cursor-pointer">Post a Tuition Request</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Find a Tutor</li>
                        <li className="hover:text-yellow-500 cursor-pointer">How It Works</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Student FAQ</li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h2 className="font-semibold mb-2 text-white">Contact Us</h2>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Education Street, Learning City, LC 12345</li>
                        <li className="flex items-center gap-2"><IoCallSharp /> +88 01615734276</li>
                        <li className="flex items-center gap-2"><IoIosMailOpen /> hello@tuitionhub.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
                <p>© 2025 TuitionHub. All rights reserved.</p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <span className="hover:text-yellow-500 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-yellow-500 cursor-pointer">Terms of Service</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
