import { motion } from 'framer-motion';
import { useState } from 'react';
import SocialIcon from '../components/common/SocialIcon';

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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
            Meet Our Team
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            The passionate individuals behind TalentForge who are dedicated to revolutionizing
            interview preparation.
          </p>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="card group cursor-pointer p-6 hover:shadow-lg transition-all duration-300"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                  style={{ objectPosition: 'center 25%' }}
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 gradient-text">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-text-secondary mb-4 line-clamp-2">{member.bio}</p>
                <div className="flex gap-4 justify-center">
                  {member.social.map((social, index) => (
                    <SocialIcon
                      key={index}
                      platform={social.platform}
                      url={social.url}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Member Modal */}
      {selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-full">
                <div className="relative w-full h-full min-h-[600px]">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
                <button
                  className="absolute top-4 right-4 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                  onClick={() => setSelectedMember(null)}
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-6 p-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2 gradient-text">{selectedMember.name}</h2>
                  <p className="text-primary mb-2">{selectedMember.role}</p>
                  <p className="text-text-secondary">{selectedMember.bio}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 gradient-text">Professional Summary</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {selectedMember.professionalSummary}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 gradient-text">Key Contributions</h3>
                  <ul className="space-y-2">
                    {selectedMember.contributions.map((contribution, index) => (
                      <li key={index} className="flex items-center text-text-secondary">
                        <span className="text-primary mr-2">•</span>
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 gradient-text">Connect</h3>
                  <div className="flex gap-4">
                    {selectedMember.social.map((social, index) => (
                      <SocialIcon
                        key={index}
                        platform={social.platform}
                        url={social.url}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: Array<{
    platform: 'linkedin' | 'github' | 'scholar';
    url: string;
  }>;
  contributions: string[];
  professionalSummary: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Kushagra Agrawal',
    role: '2205044',
    bio: 'Backend LLM Developer',
    image: '/images/team/kushagra.jpg',
    social: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/kushagra-agrawal-51a3121ab/' },
      { platform: 'github', url: 'https://github.com/KushagraIsTaken' },
      { platform: 'scholar', url: 'https://scholar.google.com/citations?user=hZgi4BgAAAAJ&hl=en' },
    ],
    contributions: [
      'Leadership',
      'LLM Backend Development',
      'Deployment',
    ],
    professionalSummary: 'Results-driven AI and Data Science enthusiast with expertise in predictive analytics, NLP, and deep learning. Adept at leveraging advanced machine learning frameworks and cloud technologies to drive data-driven decision-making. Strong research background with multiple publications in Springer, Elsevier, and IEEE. Experienced in developing AI-powered solutions for healthcare, manufacturing, and automation. Passionate about innovation, interdisciplinary collaboration, and advancing AI for real-world impact.',
  },
  {
    id: 2,
    name: 'Pracheeta Gupta',
    role: '2205051',
    bio: 'Subject Bot Developer',
    image: '/images/team/pracheeta.jpg',
    social: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/pracheeta-gupta-5a0987175/' },
      { platform: 'github', url: 'https://github.com/PracheetaGupta' },
    ],
    contributions: [
      'Frontend Development',
      'Subject Bot Development',
      'Dataset Curation',
    ],
    professionalSummary: 'AI and Cybersecurity enthusiast with a strong background in OSINT, threat intelligence, and digital strategy. Experienced in business development, brand marketing, and leveraging AI-driven insights for customer engagement. Passionate about cybersecurity awareness, ethical hacking, and data-driven decision-making. Proven leadership in organizing technical initiatives and fostering industry collaborations. Actively involved in AI research and cybersecurity innovation to drive impactful technological solutions.',
  },
  {
    id: 3,
    name: 'Kshitij Krishna',
    role: '2205135',
    bio: 'Dataset Curation and Analyst',
    image: '/images/team/kshitij.jpg',
    social: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/kshitij-krishna-a912a3317/' },
      { platform: 'github', url: 'https://github.com/KSHITIJKRISHNA' },
    ],
    contributions: [
      'Dataset Curation',
      'UX Design',
      'Dataset Manipulation',
    ],
    professionalSummary: 'A pre-final year B.Tech student in Computer Science Engineering with a strong foundation in problem-solving, coding, and software development. Proficient in Python, Java, and C++, with expertise in AI/ML, cloud computing, and web development. Demonstrates leadership, ethical business practices, and teamwork, making a valuable asset to innovative tech teams.',
  },
  {
    id: 4,
    name: 'Nisharg Nargund',
    role: '2205572',
    bio: 'Backend LLM Developer',
    image: '/images/team/nisharg.jpg',
    social: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/nisharg-nargund/' },
      { platform: 'github', url: 'https://github.com/1nisharg' },
    ],
    contributions: [
      'Backend Development',
      'Deployment',
      'Software Design',
    ],
    professionalSummary: 'An AI enthusiast and Generative AI developer with expertise in NLP, computer vision, and LLMOps. Founder of OpenRAG, leading innovative AI product development. Experienced in building and deploying cutting-edge AI solutions, authoring research papers and books. Strong leadership and technical writing skills, with proven success in team management, strategic planning, and delivering impactful generative AI applications.',
  },
  {
    id: 5,
    name: 'Jaskirat Singh',
    role: '2205735',
    bio: 'UX Developer',
    image: '/images/team/jaskirat.jpg',
    social: [
      { platform: 'github', url: 'https://github.com/JSK-85' },
    ],
    contributions: [
      'UI/UX Design',
      'Frontend Development',
      'Data Curation',
    ],
    professionalSummary: 'A passionate and detail-oriented front-end developer with a strong foundation in web technologies, including HTML, CSS, and JavaScript. He has hands-on experience in building responsive and user-friendly interfaces, demonstrating a keen eye for design and functionality. In addition to his front-end expertise, a solid theoretical understanding and practical knowledge of Swift and Flutter, enabling to explore cross-platform and iOS app development.',
  },
  {
    id: 6,
    name: 'Yash Agarwal',
    role: '22053826',
    bio: 'Frontend Developer',
    image: '/images/team/yash.jpg',
    social: [
      { platform: 'github', url: 'https://github.com/Yash-Agarwal11' },
    ],
    contributions: [
      'UI/UX Design',
      'Frontend Development',
      'Dataset Curation',
    ],
    professionalSummary: 'A passionate frontend developer with a strong fundamentals over the subjects which helped our Team TalentForge while building our Subject-wise Ai assistants. Strong hands on experience over the use of AI tools which streamlined and boost the building of Talentforge.',
  },
];

export default Team; 