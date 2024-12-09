import React from 'react';
import { motion } from 'framer-motion';

const memes = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDJ6Y2k4Y3Bxa2N1NWF0MXJ5NnBxbWR0Ym8yeWxxaWR1NHJxY2JxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26u4lOMA8JKSnL9Uk/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWRyYnR0M2t4ZWx5ZXdqbXd6ZDZ5Y3Jwd2xxbWRwN2Zya2txYnR6aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/artj92V8o75VPL7AeQ/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXhyNzcwcXUycG1kYW4ycmljb2h6MzNuaTV4MnEyM3BrYWwyZmVwZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QTAVEex4ANH1pcdg16/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXR3ZWU0Mzd1bjlsd2VmaTFjbWkydHp6bjV0dDhraDAxMjZ0a290diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YRuFixSNWFVcXaxpmX/giphy.gif",
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