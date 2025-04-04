import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Features = () => {
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
            Features
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Discover how TalentForge helps you prepare for interviews with cutting-edge AI technology
            and personalized learning experiences.
          </p>
        </motion.div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="card group"
            >
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-text-secondary mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-text-secondary">
                    <span className="text-primary mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Join thousands of successful candidates who have prepared with TalentForge.
          </p>
          <Link to="/interview-bots" onClick={() => window.scrollTo(0, 0)}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
            >
              Start Free Practice
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

const mainFeatures = [
  {
    icon: '🤖',
    title: 'AI-Powered Practice',
    description: 'Experience realistic interview simulations with our advanced AI technology.',
    benefits: [
      'Adaptive question difficulty',
      'Real-time feedback',
      'Personalized learning path',
      'Progress tracking',
    ],
  },
  {
    icon: '📊',
    title: 'Performance Analytics',
    description: 'Track your progress and identify areas for improvement.',
    benefits: [
      'Detailed performance metrics',
      'Strength and weakness analysis',
      'Improvement recommendations',
      'Progress visualization',
    ],
  },
  {
    icon: '🎯',
    title: 'Subject-Wise Focus',
    description: 'Practice specific subjects and topics to strengthen your knowledge.',
    benefits: [
      'Topic-specific practice',
      'Comprehensive question bank',
      'Difficulty levels',
      'Topic-wise progress',
    ],
  },
  {
    icon: '💬',
    title: 'Real-time Feedback',
    description: 'Get instant feedback on your responses to improve your skills.',
    benefits: [
      'Detailed explanations',
      'Best practice suggestions',
      'Common mistakes analysis',
      'Improvement tips',
    ],
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    description: 'Practice anywhere, anytime with our responsive interface.',
    benefits: [
      'Responsive design',
      'Offline practice mode',
      'Cross-device sync',
      'Mobile-optimized UI',
    ],
  },
  {
    icon: '🎓',
    title: 'Expert Guidance',
    description: 'Learn from industry experts with curated content.',
    benefits: [
      'Expert-curated questions',
      'Industry best practices',
      'Interview tips',
      'Success strategies',
    ],
  },
];


export default Features; 