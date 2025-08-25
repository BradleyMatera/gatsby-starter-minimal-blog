import { motion } from "framer-motion";
import React from "react";
import "../../src/components/style.css";

export function ProjectCard({ title, description, technologies, demoLink, githubLink, status, bgColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, rotate: 1 }}
      viewport={{ once: true }}
      className={`rounded-2xl shadow-2xl hover:shadow-3xl transition-transform duration-500 ease-in-out ${bgColor} p-8 project-card`}
    >
      <div>
        <h3 className="project-card-title mb-2">{title}</h3>
        <p className="project-card-description mb-4">{description}</p>
        <p className="project-card-technologies mb-4">{technologies}</p>
      </div>
        <div className="flex flex-wrap gap-3 mt-4 project-card-buttons">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-button"
            >
              <img src="https://cdn.simpleicons.org/chromium/ffffff" alt="demo icon" aria-hidden="true" />
              <span>Demo</span>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-github"
            >
              <img src="https://cdn.simpleicons.org/github/ffffff" alt="github icon" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          )}
        {status && (
          <span className="project-card-status">{status}</span>
        )}
      </div>
    </motion.div>
  );
}
