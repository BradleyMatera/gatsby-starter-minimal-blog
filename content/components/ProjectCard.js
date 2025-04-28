import { motion } from "framer-motion";
import React from "react";
import "../../src/components/style.css";

export function ProjectCard({ title, description, technologies, demoLink, githubLink, status, bgColor }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out ${bgColor} p-8 project-card`}
    >
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-base mb-4">{description}</p>
        <p className="text-sm text-gray-400 mb-4">{technologies}</p>
      </div>
      <div className="flex flex-wrap gap-3 mt-4">
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition"
          >
            🚀 Demo
          </a>
        )}
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded-full transition"
          >
            🐙 GitHub
          </a>
        )}
        {status && (
          <span className="text-green-400 text-xs font-bold">{status}</span>
        )}
      </div>
    </motion.div>
  );
}
