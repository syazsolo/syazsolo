export type QnaOption = {
  id: string;
  question: string;
  answer: string;
  followUp?: string[];
};

export const qnaData: Record<string, QnaOption> = {
  start: {
    id: 'start',
    question: 'Start',
    answer:
      "Hi! I'm Syazani. Ask me anything about my work, skills, or experience. I'll answer directly here.",
    followUp: ['about-syazani', 'skills', 'experience', 'contact'],
  },
  'about-syazani': {
    id: 'about-syazani',
    question: 'Who are you?',
    answer:
      "I'm a software engineer who enjoys building clean, reliable web apps. I care about thoughtful UX and pragmatic engineering.",
    followUp: ['hobbies', 'motivation', 'start-again'],
  },
  skills: {
    id: 'skills',
    question: 'What are your skills?',
    answer:
      "Day‑to‑day I work with React, Next.js, TypeScript, Node.js, and Tailwind. I'm comfortable across the stack and I pick up new tools quickly.",
    followUp: ['frontend-skills', 'backend-skills', 'start-again'],
  },
  'frontend-skills': {
    id: 'frontend-skills',
    question: 'Front‑end specifics?',
    answer:
      'On the frontend: React and Next.js, component systems, accessibility, performance, and design systems with Tailwind or CSS Modules.',
    followUp: ['backend-skills', 'experience', 'start-again'],
  },
  'backend-skills': {
    id: 'backend-skills',
    question: 'Back‑end specifics?',
    answer:
      'On the backend: Node.js/Express, REST, some GraphQL, and databases like PostgreSQL and MongoDB. I care about clear APIs and robust error handling.',
    followUp: ['frontend-skills', 'experience', 'start-again'],
  },
  experience: {
    id: 'experience',
    question: "What's your experience?",
    answer:
      "I've shipped features for both small sites and larger web apps. I love collaborating with designers and product folks to deliver polished outcomes.",
    followUp: ['specific-project', 'start-again'],
  },
  'specific-project': {
    id: 'specific-project',
    question: 'Tell me about a project',
    answer:
      'Happy to! Pick something from my projects on the home page, or ask about performance work, component libraries, or data‑heavy UIs.',
    followUp: ['start-again'],
  },
  contact: {
    id: 'contact',
    question: 'How do I contact you?',
    answer:
      "The quickest way is LinkedIn or email (both are linked on this site). If you're hiring, I'd love to chat!",
    followUp: ['start-again'],
  },
  hobbies: {
    id: 'hobbies',
    question: 'What do you do for fun?',
    answer:
      'Outside of work I read, hike, and hunt for good coffee. Balance helps me stay creative.',
    followUp: ['motivation', 'start-again'],
  },
  motivation: {
    id: 'motivation',
    question: 'What motivates you?',
    answer:
      'Building useful things with great teams. I like solving real problems and polishing the details that make experiences feel effortless.',
    followUp: ['hobbies', 'start-again'],
  },
  'start-again': {
    id: 'start-again',
    question: 'Start over',
    answer: 'Sure — what would you like to know?',
    followUp: ['about-syazani', 'skills', 'experience', 'contact'],
  },
};
