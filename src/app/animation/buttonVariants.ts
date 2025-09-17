import { Variants, cubicBezier } from "framer-motion";

const easing = cubicBezier(0.42, 0, 0.58, 1);

export const buttonVariants: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.5, ease: easing } },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: easing } },
};
