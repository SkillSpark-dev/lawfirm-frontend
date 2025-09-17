import { Variants } from "framer-motion";

export const statVariants: Variants[] = [
  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } },
  { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } },
  { hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.7 } } },
  { hidden: { rotate: -90, opacity: 0 }, visible: { rotate: 0, opacity: 1, transition: { duration: 0.8 } } },
];
