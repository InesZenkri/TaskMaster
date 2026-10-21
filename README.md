# TaskMaster

A task management web app built with React, TypeScript, and Firebase. Sign up with email and password, organize tasks with categories, priorities, and due dates, and track your progress with built-in analytics.

## Features

- Email/password authentication with Firebase Auth, including password reset
- Create, edit, complete, and delete tasks
- Categories (Personal, Work, Shopping, Health) and priorities (Low, Medium, High)
- Optional due dates with a calendar view
- Archive of completed tasks
- Analytics dashboard: completion rate, tasks by category and priority, completion trend over time (Recharts)
- Light/dark theme
- A celebration meme when you complete a task

Tasks are stored in the browser via localStorage (zustand persist); Firebase is used for authentication only.

## Tech Stack

- React 18, TypeScript, Vite
- Tailwind CSS
- Zustand (state management)
- Firebase Authentication
- Recharts, Framer Motion, date-fns, react-hot-toast, lucide-react

## Getting Started

Prerequisites: Node.js, and a Firebase project with Email/Password authentication enabled.

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/InesZenkri/TaskMaster.git
   cd TaskMaster
   npm install
   ```

2. Create a `.env` file in the project root with your Firebase config:

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build
