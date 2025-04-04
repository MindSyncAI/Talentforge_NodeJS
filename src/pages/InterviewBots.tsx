import { motion } from 'framer-motion';
import { useState } from 'react';

const InterviewBots = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const filteredBots = selectedCategory === 'all'
    ? interviewBots
    : interviewBots.filter(bot => bot.category === selectedCategory);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-24 pb-16"
    >
      {/* Hero Section */}
      <section className="text-center mb-20">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Interview Bots
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Choose from our specialized AI interviewers designed to simulate different interview styles
            and help you prepare effectively.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 mb-12">
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary via-accent to-primary text-white shadow-lg shadow-primary/50'
                  : 'bg-foreground/60 hover:bg-foreground/80 backdrop-blur-sm text-text-secondary hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-accent hover:to-primary'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Interview Bots Grid */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBots.map((bot) => (
            <motion.div
              key={bot.id}
              variants={itemVariants}
              className="card group"
            >
              <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                <img
                  src={bot.image}
                  alt={bot.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    {bot.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 gradient-text">{bot.title}</h3>
              <p className="text-text-secondary mb-4">{bot.description}</p>
              <div className="space-y-2 mb-6">
                {bot.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-text-secondary">
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
              <a
                href={bot.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn w-full magnetic-effect bg-gradient-to-r from-primary via-accent to-primary hover:from-primary-light hover:via-accent-light hover:to-primary-light text-white transition-all duration-300"
                >
                  Start Practice
                </motion.button>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Ready to Start Practicing?</h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Choose your preferred interview bot and start practicing with our AI-powered platform.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn magnetic-effect bg-gradient-to-r from-primary via-accent to-primary hover:from-primary-light hover:via-accent-light hover:to-primary-light text-white transition-all duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </motion.div>
  );
};

const categories = [
  { id: 'all', name: 'All Bots' },
  { id: 'technical', name: 'Technical' },
  { id: 'hr', name: 'HR' }
];

const interviewBots = [
  {
    id: 1,
    title: 'HR Specialist Bot',
    category: 'hr',
    description: 'Practice common behavioral questions and situational scenarios with our HR interview bot.',
    image: '/images/bots/hr-bot.jpeg',
    features: [
      'Behavioral questions',
      'Situational scenarios',
      'Personality assessment',
      'Communication skills',
    ],
    link: 'https://talentforge-1.onrender.com',
  },
  {
    id: 2,
    title: 'Computer Networks Bot',
    category: 'technical',
    description: 'Master networking concepts, protocols, routing, switching, and network security principles.',
    image: '/images/bots/cn-bot.png',
    features: [
      'Network protocols',
      'Routing algorithms',
      'Network security',
      'Performance optimization',
    ],
    link: 'https://cn-bot-6vaw.onrender.com',
  },
  {
    id: 3,
    title: 'Operating System Bot',
    category: 'technical',
    description: 'Practice process management, memory management, file systems, and OS architecture concepts.',
    image: '/images/bots/os-bot.png',
    features: [
      'Process management',
      'Memory management',
      'File systems',
      'OS architecture',
    ],
    link: 'https://os-bot.onrender.com/',
  },
  {
    id: 4,
    title: 'Computer Organization & Architecture Bot',
    category: 'technical',
    description: 'Learn about CPU architecture, memory hierarchy, instruction sets, and digital logic design.',
    image: '/images/bots/coa-bot.png',
    features: [
      'CPU architecture',
      'Memory hierarchy',
      'Instruction sets',
      'Digital logic',
    ],
    link: 'https://coa-bot-1.onrender.com',
  },
  {
    id: 5,
    title: 'Java OOP Bot',
    category: 'technical',
    description: 'Master Java programming, OOP principles, design patterns, and advanced Java features.',
    image: '/images/bots/java-bot.png',
    features: [
      'OOP principles',
      'Design patterns',
      'Java features',
      'Best practices',
    ],
    link: 'https://oops-bot.onrender.com',
  },
  {
    id: 6,
    title: 'Database Management System Bot',
    category: 'technical',
    description: 'Practice database design, SQL queries, normalization, and database management concepts.',
    image: '/images/bots/dbms-bot.png',
    features: [
      'Database design',
      'SQL queries',
      'Normalization',
      'DBMS concepts',
    ],
    link: 'https://dbms-bot.onrender.com/',
  },
];

export default InterviewBots; 