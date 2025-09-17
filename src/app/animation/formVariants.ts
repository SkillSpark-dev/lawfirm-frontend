// animations/formVariants.ts
import { Variants } from "framer-motion";

// Form input/heading/button animations
export const formVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

// Hover effect for sections
export const sectionHover = {
  scale: 1.02,
  boxShadow: "0px 15px 25px rgba(0,0,0,0.15)",
};
