import * as React from "react";
import { Link } from "gatsby";

const HomeHero = () => (
  <section className="section-shell hero-section">
    <div className="surface-card hero-grid">
      <div>
        <span className="hero-highlight">Bradley Matera</span>
        <h1 className="hero-headline">Full-Stack Development and Cloud Engineering</h1>
        <p className="hero-description">
          I am a Full Stack Software Engineer who recently completed my B.S. in Web Development at Full
          Sail University. I build real, production-ready systems with scalable backend services and
          strong cloud architecture. I have hands-on AWS experience from my Support Engineering internship
          at Amazon where I troubleshot live environments and worked with real customer workloads.
        </p>
        <p className="hero-description">
          Explore the case studies, sprint retros, and tooling guides I use to deliver secure, accessible applications from discovery to deployment.
        </p>
        <div className="hero-actions">
          <Link data-variant="primary" to="/projects">
            Browse project case studies
          </Link>
          <Link data-variant="ghost" to="/roles/cloud-engineer">
            Explore engineering role playbooks
          </Link>
        </div>

        <div className="stats-grid" aria-label="Quick stats">
          <div className="stat-card">
            <span className="stat-card__value">AWS</span>
            <span className="stat-card__meta">Cloud Support Engineer Intern · Amazon</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">B.S.</span>
            <span className="stat-card__meta">Web Development · Full Sail · GPA 3.8</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">Focus</span>
            <span className="stat-card__meta">Cloud, DevOps, APIs, AI workflows</span>
          </div>
        </div>
      </div>

      <div className="feature-list">
        <div className="feature-card">
          <span className="feature-card__icon">01</span>
          <h3 className="feature-card__title">Production cloud systems</h3>
          <p className="feature-card__body">
            Harden AWS workloads with IAM, logging, staged environments, and cost-aware design that keeps services stable and affordable.
          </p>
        </div>
        <div className="feature-card">
          <span className="feature-card__icon">02</span>
          <h3 className="feature-card__title">Secure backend services</h3>
          <p className="feature-card__body">
            Ship Node.js APIs with real authentication, instrumentation, and documentation so teammates can build on top without surprises.
          </p>
        </div>
        <div className="feature-card">
          <span className="feature-card__icon">03</span>
          <h3 className="feature-card__title">Automation-first workflows</h3>
          <p className="feature-card__body">
            Wire CI/CD, branch protections, and AI helpers into delivery pipelines so the right code reaches production every time.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HomeHero;
