import React, { useState, useEffect } from 'react';
import {
  Home,
  User,
  FileText,
  Briefcase,
  MessageSquare,
  Mail,
  Linkedin,
  Twitter,
  Github,
  ExternalLink,
  Cpu,
  ShieldCheck,
  Layers,
  Phone,
  Code,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

// --- Project Data ---
export const PROJECTS_DATA = [
  {
    id: 'aes-128-fpga',
    title: 'AES-128 Encryption with XOR Arbiter PUF on FPGA (2025)',
    category: 'CRYPTOGRAPHY',
    shortDesc: 'Implementation of Non-linear XOR Arbiter PUF on AES-128 Encryption Standard.',
    desc: 'Implementation of Non-linear XOR Arbiter PUF on AES-128 Encryption Standard. Developed to enhance hardware-level security. Implemented a digital PUF-inspired architecture to generate unique, unpredictable responses for secure key operations. Validated the design through simulation, demonstrating improved randomness and non-linearity in cryptographic behaviour.',
    fullDesc: 'This project focuses on enhancing hardware security for the AES-128 encryption standard using Physical Unclonable Functions (PUFs). By implementing a non-linear XOR Arbiter PUF on an FPGA, we create a unique digital fingerprint for the hardware. This fingerprint is used to generate unpredictable responses for secure key operations, making the device resistant to cloning and side-channel attacks. The design was rigorously validated through simulation, showing significant improvements in randomness and non-linearity compared to traditional security methods.',
    tech: ['Verilog', 'Xilinx Vivado', 'FPGA (Basys 3)', 'Cryptography'],
    image: '/fpga.jpeg',
    color: '#0056b3',
    challenges: 'Ensuring consistent non-linearity across different FPGA temperatures and voltage levels while maintaining the performance of the AES core.',
    solutions: 'Implemented a specialized debiasing algorithm and optimized the arbiter path delays to maximize entropy.'
  },
  {
    id: 'radar-system',
    title: 'Radar System for Object Detection',
    category: 'EMBEDDED SYSTEMS',
    shortDesc: 'An Arduino radar system using ultrasonic sensors and servo motors.',
    desc: 'An Arduino radar system uses an Arduino microcontroller with an ultrasonic sensor mounted on a servo motor to detect objects within a set range. It sends ultrasonic waves and measures their reflection time to determine the distance and direction of nearby objects.',
    fullDesc: 'The Arduino Radar System is an integrated embedded solution designed for real-time object detection and spatial mapping. Utilizing an HC-SR04 ultrasonic sensor mounted on an SG90 servo motor, the system scans a 180-degree field. Data is processed by an Arduino Uno, calculating distances based on the time-of-flight of sound waves. The project includes a custom Processing-based GUI that visualizes the detected objects on a radar-like display, providing clear distance and angle information.',
    tech: ['Arduino', 'C++', 'Processing', 'Embedded C', 'Sensors'],
    image: '/radar.gif',
    color: '#1e7e34',
    challenges: 'Handling sensor noise and jitter during rapid servo rotation which led to inaccurate distance readings.',
    solutions: 'Developed a Kalman-filter inspired smoothing algorithm to average readings and implemented precise timing interrupts for the ultrasonic pulse.'
  },
  {
    id: 'iot-watering',
    title: 'IoT Enabled Smart Watering System',
    category: 'IoT SOLUTIONS',
    shortDesc: 'A smart plant-watering system using ESP8266 and soil moisture sensors.',
    desc: 'A smart plant-watering system using ESP8266 monitors soil moisture through a sensor and automatically activates a water pump when the soil becomes too dry. It can be controlled remotely via Wi-Fi, allowing users to manage irrigation through a smartphone app.',
    fullDesc: 'This IoT-driven agriculture project automates the irrigation process for domestic plants. Using an ESP8266 (NodeMCU) as the central hub, it continuously monitors soil moisture levels. When the threshold drops below a predefined point, the system triggers a relay to activate a water pump. Beyond automation, the system connects to a cloud dashboard (Blynk/Custom), allowing users to monitor soil health in real-time and manually override the pump from anywhere in the world via their mobile devices.',
    tech: ['ESP8266', 'IoT', 'Wi-Fi Protocols', 'Soil Sensors', 'Cloud Integration'],
    image: '/water.jpg',
    color: '#d97706',
    challenges: 'Maintaining low power consumption for battery-operated deployment while keeping the Wi-Fi connection active.',
    solutions: 'Implemented a deep-sleep cycle for the ESP8266, waking it up only during sensor measurement intervals and using a persistent MQTT connection for fast data bursts.'
  },
];

// --- Sub-Components ---

const MobileNav = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT ME' },
    { id: 'skills', label: 'TECHNICAL SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'GET IN TOUCH' },
  ];

  const handleClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mobile-nav-dropdown">
      <button className="mobile-nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={24} />
      </button>
      {isOpen && (
        <nav className="mobile-dropdown-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-dropdown-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'about', label: 'ABOUT ME', icon: User },
    { id: 'skills', label: 'TECHNICAL SKILLS', icon: Layers },
    { id: 'projects', label: 'PROJECTS', icon: Briefcase },
    { id: 'contact', label: 'GET IN TOUCH', icon: Mail },
  ];

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const navigate = useNavigate();
  return (
    <motion.div
      className="sidebar"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <motion.div
        className="sidebar-profile"
        variants={itemVariants}
        onClick={() => {
          if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
              setActiveSection('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          } else {
            setActiveSection('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <motion.div className="sidebar-avatar" variants={itemVariants}>
          <img src="/photo.jpeg" alt="Prajwal V.P" />
        </motion.div>
        <motion.div className="sidebar-signature" variants={itemVariants}>
          Prajwal VP
        </motion.div>
      </motion.div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-label">{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="section hero-section">
      <div className="liquid-blob"></div>
      <div className="hero-grid">
        <div className="hero-content">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-greeting"
          >
            HI THERE!
          </motion.h3>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} x
            className="hero-name"
          >
            I'M <br /><span className="highlight">PRAJWAL V.P</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-tagline"
          >
            FRONTEND DEVELOPER
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hero-desc"
          >
            I am a highly motivated Electronics and Communication Engineering student from PES University with a strong foundation in hardware–software integration and hands-on project development. I work as a Frontend Developer, creating responsive and interactive web applications.
          </motion.p>
        </div>
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="image-arc"
            animate={{ rotate: 345 }}
            initial={{ rotate: 300 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
          <div className="hero-image-wrapper">
            <img src="/photo.jpeg" alt="Prajwal V.P" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const education = [
    { year: '2019 - 2020', title: 'Class X', place: 'Hill Rock National Public School, Bengaluru' },
    { year: '2021 - 2022', title: 'Class XII', place: 'Deeksha Vedantu PU College, Bengaluru' },
    { year: 'Sep 2022 - Present', title: 'B.Tech in Electronics & Communication', place: 'PES University, Bengaluru' },
  ];

  const experience = [
    { year: 'June - July 2025', title: 'Intern', place: 'Bharat Electronics Limited (BEL) - Export Manufacturing SBU' },
    { year: 'Jan - April 2026', title: 'Intern', place: 'Inventech Info Solutions - Frontend Developer' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >ABOUT ME</motion.h2>
        <div className="about-grid">
          <div className="about-content">
            <motion.p
              className="about-text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              I am a highly motivated Electronics and Communication Engineering student from PES University with a strong foundation in hardware–software integration and hands-on project development.
              <br /><br />
              I have practical experience in designing and building robotic systems and automation-based solutions. Alongside my core engineering background, I work as a Frontend Developer, creating responsive and interactive web applications using HTML, CSS, and JavaScript. I am passionate about developing solutions that bridge hardware and software — from FPGA-based security implementations to IoT-enabled automated irrigation systems.
              <br /><br />
              In addition to my technical expertise, I have developed skills in AutoCAD for 2D and 3D mechanical design, enhancing my ability to visualize and prototype engineering concepts effectively.
            </motion.p>
          </div>

          <motion.div
            className="edu-exp-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="education-container">
              <h4 className="section-subtitle">Education</h4>
              <div className="timeline">
                <motion.div
                  className="timeline-line"
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                {education.map((item, index) => (
                  <motion.div key={index} className="timeline-item" variants={itemVariants}>
                    <div className="timeline-dot" />
                    <span className="timeline-year">{item.year}</span>
                    <div className="timeline-content">
                      <h5>{item.title}</h5>
                      <p>{item.place}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="experience-container">
              <h4 className="section-subtitle">Experience</h4>
              <div className="timeline">
                <motion.div
                  className="timeline-line"
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                {experience.map((item, index) => (
                  <motion.div key={index} className="timeline-item" variants={itemVariants}>
                    <div className="timeline-dot" />
                    <span className="timeline-year">{item.year}</span>
                    <div className="timeline-content">
                      <h5>{item.title}</h5>
                      <p>{item.place}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TechnicalSkills = () => {
  const services = [
    { icon: Cpu, title: 'Hardware Security', desc: 'Implementing PUF-based security protocols on FPGAs to prevent cloning and tampering.' },
    { icon: Code, title: 'Firmware Development', desc: 'Developing efficient C/C++ code for Arduino and ESP8266 to control sensors and actuators.' },
    { icon: Layers, title: 'Embedded Systems', desc: 'Designing integrated systems that process real-time data for automation and monitoring.' },
    { icon: ShieldCheck, title: 'Frontend Development', desc: 'Building responsive, high-performance web applications with React and modern CSS.' },
  ];

  const stats = [
    { value: 'HTML', label: 'WEB STRUCTURE' },
    { value: 'CSS', label: 'WEB STYLING' },
    { value: 'Python', label: 'PROGRAMMING LANGUAGE' },
    { value: 'Verilog', label: 'HARDWARE DESCRIPTION' },
    { value: 'Vivado', label: 'XILINX TOOL SUITE' },
    { value: 'Cadence', label: 'ELECTRONIC DESIGN' },
    { value: 'AutoCAD', label: '2D & 3D MODELLING' },
    { value: 'IoT', label: 'EMBEDDED SOLUTIONS' },
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >TECHNICAL SKILLS</motion.h2>

        <div className="skills-content-wrapper">
          <div className="services-container">
            <motion.h4
              className="section-subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >What I Do?</motion.h4>
            <motion.div
              className="services-grid"
              style={{ gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  className="service-card"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <div className="service-icon"><s.icon size={24} /></div>
                  <div className="service-content">
                    <h5>{s.title}</h5>
                    <p>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="skills-grid-container">
            <motion.h4
              className="section-subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >Key Competencies</motion.h4>
            <motion.div
              className="stats-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="stat-card"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: "#1a1a1a" }}
                >
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section projects-featured-section">
      <div className="container">
        <h2 className="section-title">PROJECTS</h2>
        <div className="projects-list">
          {PROJECTS_DATA.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="project-card-featured"
            >
              {p.category === 'EMBEDDED SYSTEMS' ? (
                <>
                  <div className="project-content">
                    <span className="project-category">{p.category}</span>
                    <h3 className="project-title" style={{ color: p.color }}>{p.title}</h3>
                    <p className="project-desc">{p.shortDesc || p.desc}</p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to={`/project/${p.id}`} className="project-btn">
                        View Project <ExternalLink size={18} />
                      </Link>
                    </motion.div>
                  </div>
                  <div className="project-image">
                    <img src={p.image} alt={p.title} />
                  </div>
                </>
              ) : (
                <>
                  <div className="project-image">
                    <img src={p.image} alt={p.title} />
                  </div>
                  <div className="project-content">
                    <span className="project-category">{p.category}</span>
                    <h3 className="project-title" style={{ color: p.color }}>{p.title}</h3>
                    <p className="project-desc">{p.shortDesc || p.desc}</p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to={`/project/${p.id}`} className="project-btn">
                        View Project <ExternalLink size={18} />
                      </Link>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >GET IN TOUCH</motion.h2>
        <motion.div
          className="contact-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          <motion.div
            className="contact-info-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Mail size={32} />
            <h5>Email</h5>
            <p>prajwalvp249@gmail.com</p>
          </motion.div>
          <motion.div
            className="contact-info-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Phone size={32} />
            <h5>Contact info</h5>
            <p>9108539676</p>
          </motion.div>
          <motion.div
            className="contact-info-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Linkedin size={32} />
            <h5>Linkedin</h5>
            <a
              href="https://www.linkedin.com/in/prajwal-vp23/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              prajwal-vp23
            </a>
          </motion.div>
        </motion.div>
        <motion.footer
          className="final-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3>THANKS FOR PATIENCE!</h3>
        </motion.footer>
      </div>
    </section>
  );
};

// --- Main App ---

import ProjectDetail from './ProjectDetail';
import { Menu, ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </>
  );
};

function PortfolioLayout({ activeSection, setActiveSection }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  return (
    <div className="app-wrapper">
      {/* Desktop Sidebar */}
      <div className="desktop-sidebar">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={(id) => {
            setActiveSection(id);
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>

      {/* Mobile Dropdown Navigation */}
      <MobileNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isMobileNavOpen}
        setIsOpen={setIsMobileNavOpen}
      />

      <main className="main-content">
        <Hero />
        <About />
        <TechnicalSkills />
        <Projects />
        <Contact />
      </main>

      <BackToTop />
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Check if the page was reloaded
    const perfEntries = window.performance.getEntriesByType('navigation');
    if (perfEntries.length > 0 && perfEntries[0].type === 'reload') {
      window.location.href = '/';
    }
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <PortfolioLayout
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          } />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
