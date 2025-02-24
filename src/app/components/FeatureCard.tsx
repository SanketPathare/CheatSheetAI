import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description }:any) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all hover:shadow-md hover:shadow-indigo-500/20"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="bg-indigo-900/50 p-3 rounded-lg mb-4">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </motion.div>
);

export default FeatureCard;
