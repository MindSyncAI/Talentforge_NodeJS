import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`theme-toggle group relative p-2 rounded-full transition-colors duration-200 ${
        theme === 'dark'
          ? 'hover:bg-white/10'
          : 'hover:bg-hover-light'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="relative w-6 h-6"
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <MoonIcon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-200" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <SunIcon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-200" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className={`absolute inset-0 rounded-full ${
            theme === 'dark'
              ? 'bg-gradient-glow'
              : 'bg-gradient-primary/20'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 