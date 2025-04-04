import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import SocialIcon from '../components/common/SocialIcon';
import React from 'react';

type SocialPlatform = 'linkedin' | 'github' | 'scholar';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    platform: SocialPlatform;
    url: string;
  }[];
}

const Home = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Scroll progress indicator
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Optimize scroll handling with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsHeaderScrolled(window.scrollY > 50);
        if (window.scrollY > 100) {
          setShowScrollIndicator(false);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Lazy load 3D component
  useEffect(() => {
    const timer = setTimeout(() => {
      setIs3DLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Optimize intersection observer
  useEffect(() => {
    const sections = ['hero', 'features', 'interview-bots', 'team'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Memoize team members data
  const teamMembers = useMemo<TeamMember[]>(() => [
    {
      name: 'Kushagra Agrawal',
      role: 'Lead Developer',
      image: '/images/team/kushagra.jpg',
      bio: 'Backend LLM Developer',
      keyContributions: [
        'Architected the core application structure',
        'Implemented real-time interview features',
        'Developed the AI-powered feedback system'
      ],
      social: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/kushagra' },
        { platform: 'github', url: 'https://github.com/kushagra' },
        { platform: 'scholar', url: 'https://scholar.google.com/kushagra' }
      ]
    },
    {
      name: 'Pracheeta Gupta',
      role: '2205051',
      bio: 'Subject Bot Developer',
      image: '/images/team/pracheeta.jpg',
      social: [
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/pracheeta-gupta-5a0987175/' },
        { platform: 'github', url: 'https://github.com/PracheetaGupta' }
      ]
    },
    {
      name: 'Kshitij Krishna',
      role: '2205135',
      bio: 'Dataset Curation and Analyst',
      image: '/images/team/kshitij.jpg',
      social: [
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/kshitij-krishna-a912a3317/' },
        { platform: 'github', url: 'https://github.com/KSHITIJKRISHNA' }
      ]
    },
    {
      name: 'Nisharg Nargund',
      role: '2205572',
      bio: 'Backend LLM Developer',
      image: '/images/team/nisharg.jpg',
      social: [
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/nisharg-nargund/' },
        { platform: 'github', url: 'https://github.com/1nisharg' }
      ]
    },
    {
      name: 'Jaskirat Singh',
      role: '2205735',
      bio: 'UX Developer',
      image: '/images/team/jaskirat.jpg',
      social: [
        { platform: 'github', url: 'https://github.com/JSK-85' }
      ]
    },
    {
      name: 'Yash Agarwal',
      role: '22053826',
      bio: 'Frontend Developer',
      image: '/images/team/yash.jpg',
      social: [
        { platform: 'github', url: 'https://github.com/Yash-Agarwal11' }
      ]
    }
  ], []);

  // Optimize animations with useCallback
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll Progress Indicator */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 z-50 ${
          theme === 'dark' ? 'bg-primary' : 'bg-primary-light'
        }`}
        style={{ scaleX: progress }}
      />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative overflow-hidden">
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background/90 to-background/80' 
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-gray-50/90 to-gray-100/80'
        } backdrop-blur-sm`} />
        
        {/* 3D Background with lazy loading */}
        {is3DLoaded && (
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
                <Sphere args={[1, 100, 200]} scale={2}>
                  <MeshDistortMaterial
                    color={theme === 'dark' ? '#4f46e5' : '#818cf8'}
                    attach="material"
                    distortFactor={0.3}
                    speed={1}
                    roughness={0.2}
                    metalness={0.9}
                    glass
                    transparent
                    opacity={0.8}
                  />
                </Sphere>
                <Sphere args={[1, 100, 200]} scale={1.8}>
                  <MeshDistortMaterial
                    color={theme === 'dark' ? '#818cf8' : '#4f46e5'}
                    attach="material"
                    distortFactor={0.2}
                    speed={0.8}
                    roughness={0.1}
                    metalness={0.8}
                    glass
                    transparent
                    opacity={0.6}
                  />
                </Sphere>
              </Float>
              <OrbitControls 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={1.5}
                enablePan={true}
                panSpeed={0.5}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
                enableDamping
                dampingFactor={0.05}
              />
              <Environment preset="city" />
            </Canvas>
          </div>
        )}

        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Floating Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Animated Grid Lines */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${theme === 'dark' ? '#ffffff' : '#000000'} 1px, transparent 1px),
                                linear-gradient(90deg, ${theme === 'dark' ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                theme === 'dark' ? 'bg-primary/30' : 'bg-primary-light/30'
              }`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        
        {/* Hero Content */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-effect p-8 rounded-2xl text-center relative overflow-hidden">
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(45deg, ${theme === 'dark' ? '#4f46e5' : '#818cf8'}, ${theme === 'dark' ? '#818cf8' : '#4f46e5'})`,
                opacity: 0.1,
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <motion.h1 
              className="text-4xl font-bold gradient-text mb-4 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              TalentForge
            </motion.h1>
            <motion.p 
              className="text-lg text-foreground/80 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Crafting Tomorrow's Talent
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
            <div className="flex flex-col items-center">
              <span className="text-sm text-foreground/60 mb-2">Scroll to explore</span>
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-6 h-10 border-2 border-foreground/20 rounded-full p-1"
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-foreground/60 rounded-full mx-auto"
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            </div>
            </motion.div>
          )}
      </section>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-4">
          {['hero', 'features', 'interview-bots', 'team'].map((section) => (
            <motion.button
              key={section}
              onClick={() => {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section
                  ? 'bg-gradient-to-r from-primary via-accent to-primary scale-125 shadow-lg shadow-primary/50'
                  : 'bg-foreground/60 hover:bg-foreground/80 backdrop-blur-sm shadow-md'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 gradient-text`}>
              Why Choose TalentForge?
            </h2>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
            }`}>
              Experience the future of interview preparation with our cutting-edge features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Practice',
                description: 'Get personalized feedback and guidance from our advanced AI interview bots.',
                icon: '🤖'
              },
              {
                title: 'Real-time Feedback',
                description: 'Receive instant feedback on your responses and improve your interview skills.',
                icon: '⚡'
              },
              {
                title: 'Comprehensive Coverage',
                description: 'Practice with questions covering all major technical subjects and HR topics.',
                icon: '📚'
              },
              {
                title: 'Progress Tracking',
                description: 'Monitor your improvement with detailed analytics and performance metrics.',
                icon: '📊'
              },
              {
                title: 'Mock Interviews',
                description: 'Experience realistic interview scenarios with our AI interviewers.',
                icon: '🎯'
              },
              {
                title: '24/7 Availability',
                description: 'Practice anytime, anywhere with our always-available platform.',
                icon: '🌐'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="feature-card magnetic-effect"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-2 gradient-text`}>
                  {feature.title}
                </h3>
                <p className={theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Bots Section */}
      <section id="interview-bots" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 gradient-text`}>
              Our Interview Bots
            </h2>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
            }`}>
              Choose from our specialized AI interviewers to practice different aspects of your interview
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'HR Specialist Bot',
                description: 'Practice common behavioral questions and situational scenarios with our HR interview bot.',
                image: '/images/hr-bot.jpg',
                link: 'https://talentforge-1.onrender.com'
              },
              {
                title: 'Computer Networks Bot',
                description: 'Master networking concepts, protocols, routing, switching, and network security principles.',
                image: '/images/networks-bot.jpg',
                link: 'https://cn-bot-6vaw.onrender.com'
              },
              {
                title: 'Operating System Bot',
                description: 'Practice process management, memory management, file systems, and OS architecture concepts.',
                image: '/images/os-bot.jpg',
                link: 'https://os-bot.onrender.com/'
              },
              {
                title: 'Computer Organization & Architecture Bot',
                description: 'Learn about CPU architecture, memory hierarchy, instruction sets, and digital logic design.',
                image: '/images/coa-bot.jpg',
                link: 'https://coa-bot-1.onrender.com'
              },
              {
                title: 'Java OOP Bot',
                description: 'Master Java programming, OOP principles, design patterns, and advanced Java features.',
                image: '/images/java-bot.jpg',
                link: 'https://oops-bot.onrender.com'
              },
              {
                title: 'Database Management System Bot',
                description: 'Practice database design, SQL queries, normalization, and database management concepts.',
                image: '/images/dbms-bot.jpg',
                link: 'https://dbms-bot.onrender.com/'
              }
            ].map((bot, index) => (
              <motion.div
                key={bot.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="feature-card magnetic-effect"
              >
                <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl">🤖</span>
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-2 gradient-text`}>
                  {bot.title}
                </h3>
                <p className={`mb-4 ${
                  theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
                }`}>
                  {bot.description}
                </p>
                <a href={bot.link} target="_blank" rel="noopener noreferrer">
                  <button className="btn w-full magnetic-effect bg-gradient-to-r from-primary via-accent to-primary hover:from-primary-light hover:via-accent-light hover:to-primary-light text-white transition-all duration-300">
                    Start Practice
                  </button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
        initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 gradient-text`}>
              Meet Our Team
            </h2>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
            }`}>
              The talented individuals behind TalentForge
            </p>
    </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="team-member magnetic-effect"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                      style={{ objectPosition: 'center 25%' }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold gradient-text">{member.name}</h3>
                  <p className="text-sm text-text-secondary">{member.role}</p>
                </div>
                <p className={`text-sm mb-4 text-center ${
                  theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
                }`}>
                  {member.bio}
                </p>
                <div className="flex gap-4 justify-center">
                  {member.social.map((social, index) => (
                    <SocialIcon
                      key={index}
                      platform={social.platform}
                      url={social.url}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Home); 