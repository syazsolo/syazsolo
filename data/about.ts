export const aboutContent: (
  | string
  | { title: string; description: string }[]
)[] = [
  "Hi, I'm Syazani.",
  "I'm a software engineer. I build web applications and solve technical problems.",
  "Recently, I've been focused on frontend work — this site mimics LinkedIn's design to show I can replicate complex interfaces. But I'm comfortable across the stack: frontend, backend, APIs, whatever the project needs.",
  'A few things on this site:',
  [
    {
      title: 'Chatbot',
      description:
        'Talk to an AI version of me. Ask about my work, my approach to clean code, or just chat about Star Wars.',
    },
    {
      title: 'Posts',
      description:
        'My thoughts on software engineering and building things right.',
    },
    {
      title: 'Skills Checklist',
      description: "What I value as an engineer and where I'm growing.",
    },
  ],
];
