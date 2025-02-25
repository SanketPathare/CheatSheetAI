"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";
import featureData from "../../Data/feactureData";

const Home = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  const featureSectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Header/Nav */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="py-10 md:py-24 px-4 flex flex-col justify-center items-center"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-6xl text-center px-4">
          <div className="inline-flex items-center bg-gray-800 rounded-full px-3 py-1 mb-4 md:mb-6">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 mr-1 md:mr-2" />
            <span className="text-xs md:text-sm text-gray-300">
              AI-Powered Learning Tools
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            AI Cheat Sheet Generator
          </h1>

          <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Create beautiful, customized cheat sheets for any topic in seconds
            with our AI-powered platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8 md:mb-12">
            <Link
              href="/cheatsheet"
              className="px-8 py-4 mx-7 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm md:text-md transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Create Your Cheat Sheet{" "}
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
          {/* Preview Image */}
          <div className="rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/20 border border-gray-800 max-w-4xl mx-auto">
            <img
              src="/hero.png"
              alt="hero-img"
              className="w-full object-cover "
            />
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-12 md:py-16 px-4 bg-gray-900/50"
        variants={featureSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">
              Create Perfect Cheat Sheets in Minutes
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-2">
              Our AI-powered platform makes it easy to generate comprehensive,
              well-organized cheat sheets for any subject or topic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featureData.map((feature) => (
              <motion.div key={feature.id} variants={featureCardVariants}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-12 md:py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800"
        variants={ctaVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto text-center px-2">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            Ready to Create Your First Cheat Sheet?
          </h2>
          <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8">
            Join thousands of students and professionals who use CheatSheetAI to
            learn faster and retain more information.
          </p>
          <Link
            href="/cheatsheet"
            className="px-6 py-3 md:px-8 md:py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm md:text-md transition-colors shadow-lg hover:shadow-xl inline-flex items-center justify-center"
          >
            Get Started for Free{" "}
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </motion.section>
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Home;
