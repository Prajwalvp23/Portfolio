import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Cpu, ShieldCheck, Layers, Code, Lightbulb, CheckCircle2 } from 'lucide-react';
import { PROJECTS_DATA } from './App';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = PROJECTS_DATA.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="error-page">
                <h2>Project Not Found</h2>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }

    return (
        <motion.div
            className="project-detail-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="project-detail-nav">
                <button
                    onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                            const element = document.getElementById('projects');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 100);
                    }}
                    className="back-btn"
                    style={{ border: 'none', cursor: 'pointer' }}
                >
                    <ArrowLeft size={20} /> Back to Projects
                </button>
            </div>

            <div className="project-detail-hero">
                <div className="project-detail-container">
                    <motion.div
                        className="project-detail-header"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="project-detail-category" style={{ color: project.color }}>{project.category}</span>
                        <h1 className="project-detail-title">{project.title}</h1>
                        <div className="project-tech-stack">
                            {project.tech.map((t, i) => (
                                <span key={i} className="tech-tag">{t}</span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="project-detail-image-wrapper"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <img src={project.image} alt={project.title} />
                    </motion.div>
                </div>
            </div>

            <div className="project-detail-content">
                <div className="project-detail-container">
                    <div className="project-detail-grid">
                        <motion.div
                            className="project-main-info"
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <section className="detail-section">
                                <h2 className="detail-section-title"><Lightbulb size={24} /> Overview</h2>
                                <p className="detail-text">{project.fullDesc || project.desc}</p>
                            </section>

                            <section className="detail-section">
                                <h2 className="detail-section-title"><ShieldCheck size={24} /> Challenges</h2>
                                <p className="detail-text">{project.challenges}</p>
                            </section>

                            <section className="detail-section">
                                <h2 className="detail-section-title"><CheckCircle2 size={24} /> Solutions</h2>
                                <p className="detail-text">{project.solutions}</p>
                            </section>
                        </motion.div>

                        <motion.div
                            className="project-sidebar-info"
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="info-card">
                                <h3>Project Info</h3>
                                <div className="info-item">
                                    <span className="info-label">Year</span>
                                    <span className="info-value">2025</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Role</span>
                                    <span className="info-value">Lead Developer</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Category</span>
                                    <span className="info-value">{project.category}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;
