"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { formVariants, sectionHover } from "@/app/animation";

interface ContactFormData {
  name: string;
  email: string;
  number: string;
  message: string;
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      reset();
      alert("Message sent successfully! We'll get back to you soon.");
    } catch (err: unknown) {
    if(err instanceof Error){
      alert(`Error: ${err.message}`);
    }else{
      alert("Something went wrong, please try again.");
    }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <motion.header
        className="bg-blue-500 text-white text-center py-10 px-4 mt-5"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      >
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="text-blue-100 mt-2">
          Fill out the form below or find us on the map. We’ll respond quickly.
        </p>
      </motion.header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6 w-full flex-1 mt-7">
        {/* CONTACT FORM */}
        <motion.div
          className="bg-white shadow-md rounded-2xl p-6 cursor-pointer"
          whileHover={sectionHover}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-semibold mb-4"
            custom={1}
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            Send Us a Message
          </motion.h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {["name", "email", "number", "message"].map((field, index) => (
              <motion.div
                key={field}
                custom={index + 2}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                {field !== "message" ? (
                  <input
                    type={field === "email" ? "email" : field === "number" ? "tel" : "text"}
                    placeholder={
                      field === "number"
                        ? "Phone Number"
                        : `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`
                    }
                    {...register(field as keyof ContactFormData, {
                      required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
                      pattern:
                        field === "email"
                          ? { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Invalid email address" }
                          : field === "number"
                          ? { value: /^[0-9]{7,15}$/, message: "Enter a valid phone number" }
                          : undefined,
                    })}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                ) : (
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    {...register("message", { required: "Message is required" })}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  />
                )}
                {errors[field as keyof ContactFormData] && (
                  <p className="text-red-500 text-sm">{errors[field as keyof ContactFormData]?.message}</p>
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              disabled={loading}
              custom={6}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        {/* GOOGLE MAP */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-md cursor-pointer"
          whileHover={sectionHover}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3544.878059883946!2d85.32862387723935!3d27.698331209127115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a408eb3551%3A0xc1019e38c80b8776!2sAle%20Law%20Firm!5e0!3m2!1sen!2snp!4v1757848002098!5m2!1sen!2snp"
            className="w-full h-full min-h-[300px] md:min-h-[500px]"
            loading="lazy"
          ></iframe>
        </motion.div>
      </main>
    </div>
  );
}
