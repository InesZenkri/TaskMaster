import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const congratsMessages = [
  { text: "You're crushing it! 💪", img: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHB4ajZydW8xenlmYjNkaHBmYXg3dHJ3YmYxeDZnYmJhMGN6aHR0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YRuFixSNWFVcXaxpmX/giphy.gif" },
  { text: "Keep up the great work! 🌟", img: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM21mbmw1bHpocHJlN202MHZoNXFxeHEwMDQ5NTR2OTBzODIycnY4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d31w24psGYeekCZy/giphy.gif" },
  { text: "Another one bites the dust! 🎯", img: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3pibm5udDhpdnVnenpkNWI1N2kxYXpxZDJ1ZHh1ZGxhNzRqMzgyayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MOWPkhRAUbR7i/giphy.gif" },
  { text: "So proud of you! 🎯", img: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2RmeTg2OWN4cm85b3RoODYzcDN5MnFvbTU1NWZ0cTk1MTBlY2RlZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Swx36wwSsU49HAnIhC/giphy.gif" },
];

interface CompletionMemeProps {
  show: boolean;
  onClose: () => void;
}

export function CompletionMeme({ show, onClose }: CompletionMemeProps) {
  const message = React.useMemo(
    () => congratsMessages[Math.floor(Math.random() * congratsMessages.length)],
    []
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClose}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 z-50"
        >
          <motion.div
            className="bg-gray-900 rounded-xl overflow-hidden max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={message.img}
              alt="Congratulations"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Well done! 🎉</h3>
              <p className="text-white/80 text-lg">{message.text}</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Keep going!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}