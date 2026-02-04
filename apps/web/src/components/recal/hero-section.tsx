"use client";

import { motion } from "framer-motion";
import heroBanner from "../../hero-banner.png";
import line from "../../line.svg";
import { useNotes } from "@/hooks/useNotes";
import { 
  fadeInUp, 
} from "@/components/recal/animation";

const HeroSection = () => {
  return (
    <div className="">
      <section className="max-h-[400px] rounded-3xl flex items-center justify-center relative w-full text-white overflow-hidden">
        <div className="absolute px-6 text-center max-w-2xl z-10">
          <motion.h1
            className="text-5xl font-semibold leading-tight"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUp}
          >
            Fix your brain's
            <span className="text-6xl font-handwriting relative font-normal ml-3 inline-block">
              cache
              <motion.img
                src={line}
                className="w-full absolute left-0 -bottom-2"
                alt=""
                initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-md mx-auto text-gray-200/80"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
          >
            Productivity and memory enhancement tool using spaced repetition and
            AI-powered note-taking.
          </motion.p>
        </div>

        <motion.img
          src={heroBanner}
          className="w-full h-full object-cover"
          alt="Hero Banner"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/20 z-0" />
      </section>
    </div>
  );
};

export default HeroSection;