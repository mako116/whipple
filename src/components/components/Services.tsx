import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
// import AnimatedSection from './AnimatedSection';

const whippleFeatures = [
  "A Social Peer-to-peer skill and knowledge contest platform that empowers users to test their knowledge, judgement and strategy against each other in a fun and rewarding way.",
  "Platform facilitates knowledge/skill based games like football trivia, general quiz battles.",
  "A Social competition platform where knowledge gives users an Edge, and only the skilled can win consistently.",
  'Social decision making ("The Deciders"): In group competition, users influence results through voting and consensus building, introducing layer of strategy, psychology and social interaction beyond random chance.',
  "Whipple integrates trivia, quizzes and forecast markets where real-world skills enhances users' chances of success."
]; 

const Services: React.FC = () => {
  return (
    <AnimatedSection>
      <section
        id="whipple-services"
        className="py-24 relative"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), rgba(39, 171, 237, 0.3)), #f0f9ff`
        }}
      >
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Whipple
            </h1>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              Whipple is a social competition platform where knowledge, strategy, and skill come together to create engaging, rewarding experiences. Test your abilities, compete with others, and influence outcomes in a fun and interactive environment.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {whippleFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4 hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-block w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                </div>
                <p className="text-gray-700 text-base md:text-lg">{feature}</p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action Section */}
           
        </div>
      </section>
    </AnimatedSection>
  );
};

export default Services;
