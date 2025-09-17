import { Variants } from "framer-motion";

// Left text (title + subtitle) animation
export const bannertextVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number = 1) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

// Right content / paragraph + button animation
export const contentVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Button pop-in + hover effect
export const bannerbuttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6 } },
  hover: { scale: 1.05, boxShadow: "0px 10px 25px rgba(0,0,0,0.2)" },
};

// Banner animation
export const bannerVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: "easeOut" } },
};
