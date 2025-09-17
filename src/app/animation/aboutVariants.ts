import { Variants } from "framer-motion";

// Image slide-in from right
export const imagesVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Text (title, subtitle, stats) fade & slide in
export const textsVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

// Button pop-in & hover effect
export const buttonsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } },
  hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" },
};
