import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`footer ${theme === 'dark' ? 'footer-dark' : 'footer-light'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left mb-4 md:mb-0"
          >
            <Link to="/" className="text-2xl font-bold gradient-text">
              TalentForge
            </Link>
            <p className={`mt-2 text-sm ${
              theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
            }`}>
              Empowering your interview success with AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex space-x-6"
          >
            <Link
              to="/privacy"
              className={`text-sm hover:text-primary transition-colors duration-200 ${
                theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={`text-sm hover:text-primary transition-colors duration-200 ${
                theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
              }`}
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className={`text-sm hover:text-primary transition-colors duration-200 ${
                theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
              }`}
            >
              Contact
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-8 pt-8 border-t text-center text-sm ${
            theme === 'dark' ? 'border-border text-text-secondary' : 'border-border-light text-text-secondary-light'
          }`}
        >
          © {new Date().getFullYear()} TalentForge. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 