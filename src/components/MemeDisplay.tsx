import React from 'react';
import { motion } from 'framer-motion';

const memes = [
  "https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&h=500&fit=crop",
];

export function MemeDisplay() {
  const [currentMeme, setCurrentMeme] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMeme((prev) => (prev + 1) % memes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-48 rounded-lg overflow-hidden"
    >
      <img
        src={memes[currentMeme]}
        alt="Motivational meme"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <p className="absolute bottom-4 left-4 text-white font-bold text-xl">
        Stay productive! 🚀
      </p>
    </motion.div>
  );
}