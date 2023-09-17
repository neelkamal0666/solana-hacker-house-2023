import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const Reveal = ({ children, duration = 0.5, delay = 0, varianttype }) => {
  const ref = useRef(null);
  const mainControls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mainControls.start("visible");
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.05,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [mainControls]);

  let variants;

  if (varianttype === "bottomToTop") {
    variants = {
      hidden: { opacity: 0, y: 70 },
      visible: { opacity: 1, y: 0 },
    };
  } else if (varianttype === "leftToRight") {
    variants = {
      hidden: { opacity: 0, x: -200 },
      visible: { opacity: 1, x: 0 },
    };
  } else if (varianttype === "rightToLeft") {
    variants = {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    };
  } else {
    variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }

  return (
    <div>
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: duration,
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
