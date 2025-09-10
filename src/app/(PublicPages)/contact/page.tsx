// app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/compnents/Header";
import Footer from "@/compnents/Footer";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { IoLocation } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    caseType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        caseType: "general",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const contactMethods = [
    {
      icon: <FaPhoneAlt className="w-6 h-6" />,
      title: "Phone",
      details: "+91 9876543210",
      description: "Sun-Fri from 10am to 6pm",
    },
    {
      icon: <TfiEmail className="w-6 h-6" />,
      title: "Email",
      details: "contact@muralilawfirm.com",
      description: "We respond within 24 hours",
    },
    {
      icon: <IoLocation className="w-6 h-6" />,
      title: "Office",
      details: "Annamnagar, Kathmandu",
      description: "Nepal",
    },
    {
      icon: <MdAccessTime className="w-6 h-6" />,
      title: "Working Hours",
      details: "Monday - Friday",
      description: "9:00 AM - 6:00 PM IST",
    },
  ];

  const caseTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "property", label: "Property Law" },
    { value: "family", label: "Family Law" },
    { value: "criminal", label: "Criminal Defense" },
    { value: "corporate", label: "Corporate Law" },
    { value: "ip", label: "Intellectual Property" },
    { value: "other", label: "Other Legal Matter" },
  ];

  return (
    <div className="min-h-screen bg-green-100">
      {/* Header */}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                Thank you for your message! We'll get back to you within 24
                hours.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                There was an error sending your message. Please try again or
                contact us directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+91 1234567890"
                  />
                </div>
                <div>
                  <label
                    htmlFor="caseType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Case Type
                  </label>
                  <select
                    id="caseType"
                    name="caseType"
                    value={formData.caseType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {caseTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief subject of your inquiry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please describe your legal matter in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 text-white py-3 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>

              <p className="text-sm text-gray-600 text-center">
                By submitting this form, you agree to our privacy policy and
                terms of service.
              </p>
            </form>
          </div>

          {/* Office Location & Map */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4  mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Office
              </h2>
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4">
                {/* Placeholder for map - replace with actual map component */}
                <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                   <iframe
    className="h-64 w-118 rounded-lg"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.647538566965!2d85.32707092405266!3d27.69728652593773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a364bb5935%3A0xf40b4cf2c78cf48a!2sAnamnagar%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1756716940130!5m2!1sen!2snp" 
   
  ></iframe>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Murali Dhar Mishra Law Firm</p>
                <p className="text-gray-600">
                  123 Legal Avenue, Connaught Place
                </p>
                <p className="text-gray-600">Annamnagar, Kathmandu</p>
                <p className="text-gray-600">Nepal</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Emergency Legal Assistance
              </h3>
              <p className="text-red-700 mb-3">
                For urgent legal matters that require immediate attention
                outside business hours:
              </p>
              <div className="bg-white rounded-md p-3">
                <p className="font-semibold text-red-800">+977 1234 5678</p>
                <p className="text-sm text-red-600">
                  Available 24/7 for emergency legal situations
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-blue-850">{method.icon}</div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {method.title}
              </h3>
              <p className="text-blue-850 font-medium mb-1">{method.details}</p>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
