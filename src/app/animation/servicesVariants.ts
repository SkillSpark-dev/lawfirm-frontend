// animations/servicesVariants.ts
import { Variants } from "framer-motion";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, y: -4, boxShadow: "0px 15px 25px rgba(0,0,0,0.15)" },
};

export const elementVariants: Variants[] = [
  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }, // Image
  { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }, // Title
  { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } },  // Description
  { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } },  // Features
  { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }, // Details
];

export const cardColors = ["bg-white", "bg-blue-50", "bg-green-50", "bg-yellow-50", "bg-purple-50"];
