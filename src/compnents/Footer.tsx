import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" text-gray-300 py-12 mt-16"style={{ backgroundImage: "url('/footerbg.png')" }}>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">LawFirm</h2>
          <p className="text-sm leading-6">
            Providing trusted legal solutions with professionalism and integrity.  
            We stand by your side to protect your rights and future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/team" className="hover:text-white">Our Team</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Practice Areas */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Practice Areas</h3>
          <ul className="space-y-2 text-sm">
            <li>Corporate Law</li>
            <li>Family Law</li>
            <li>Criminal Defense</li>
            <li>Intellectual Property</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <p className="text-sm">kathmandu 44600 , Nepal</p>
          <p className="text-sm">Phone: +977-9843372744, 9818582345</p>
          <p className="text-sm">Email: mdmishralawfirm@gmail.com</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <Link href="#"><Facebook className="w-5 h-5 hover:text-white" /></Link>
            <Link href="#"><Twitter className="w-5 h-5 hover:text-white" /></Link>
            <Link href="#"><Linkedin className="w-5 h-5 hover:text-white" /></Link>
            <Link href="#"><Mail className="w-5 h-5 hover:text-white" /></Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Tecnospire. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
