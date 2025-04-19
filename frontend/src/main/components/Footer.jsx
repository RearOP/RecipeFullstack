import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 pt-20 pb-10 font-[Montserrat]">
      <div className=" gap-10">
        {/* Logo + Info */}
        <div className="flex justify-between space-y-3">
          <h1 className="text-[24px] font-bold font-[Leckerli_One] text-red-700">
            Kocina
          </h1>
          {/* Social Icons */}
        <div className="flex gap-4 items-start justify-center md:justify-end">
          <div className="w-8 h-8 rounded-full border border-[#3b5998] flex items-center justify-center text-[#3b5998] hover:bg-[#3b5998] hover:text-white transition">
            <FaFacebookF size={14} />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#e1306c] flex items-center justify-center text-[#e1306c] hover:bg-[#e1306c] hover:text-white transition">
            <FaInstagram size={14} />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#1da1f2] flex items-center justify-center text-[#1da1f2] hover:bg-[#1da1f2] hover:text-white transition">
            <FaTwitter size={14} />
          </div>
        </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-md font-semibold text-black">
          <ul className="space-y-2">
            <li>Presentations</li>
            <li>Professionals</li>
            <li>Stores</li>
          </ul>
          <ul className="space-y-2">
            <li>Webinars</li>
            <li>Workshops</li>
            <li>Local Meetups</li>
          </ul>
          <ul className="space-y-2">
            <li>Our Initiatives</li>
            <li>Giving Back</li>
            <li>Communities</li>
          </ul>
          <ul className="space-y-2">
            <li>Contact Form</li>
            <li>Work With Us</li>
            <li>Visit Us</li>
          </ul>
        </div>
        
      </div>
      <p className="text-sm text-gray-500 mt-10">
        Made by Loop Solutions.
      </p>
    </footer>
  );
};

export default Footer;
