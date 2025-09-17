import { Variants, cubicBezier } from "framer-motion";

const directions = ["x:-100", "x:100", "y:-100", "y:100"];
const easing = cubicBezier(0.42, 0, 0.58, 1);
const transition = { duration: 0.7, ease: easing };

export const sectionVariants: Variants = {
  hidden: (custom: number) => {
    const dir = directions[custom % directions.length];
    const axis = dir.split(":")[0] as "x" | "y";
    const value = parseInt(dir.split(":")[1], 10);
    return { opacity: 0, [axis]: value };
  },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { ...transition, delay: custom * 0.2 },
  }),
};
