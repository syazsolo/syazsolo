type AboutContentItem = string | { title: string; description: string }[];

const aboutContentData: AboutContentItem[] = [
  "Hi, I'm Syazani, a software engineer in Kuala Lumpur with 3+ years of experience building Laravel/PHP, MySQL, and full-stack React/Vue applications.",
  'I am strongest when a team needs someone reliable: the person who finishes scoped backend work, communicates early when tradeoffs appear, and keeps fixes moving quickly from report to production.',
  'Recently I have been sharpening that through my own products and reading. Bigcampus and Collective Chess are where I keep applying the ideas I want to bring back into a real engineering team: cleaner delivery, stronger architecture, and healthier development flow.',
  'A few things worth checking here:',
  [
    {
      title: 'Resume and cover letter',
      description:
        'The latest versions are written for hiring teams and show the clearest summary of my work, projects, and current motivation.',
    },
    {
      title: 'Projects',
      description:
        'Bigcampus, Collective Chess, and Atuk Opah are the best signals for how I design systems, make tradeoffs, and keep building outside work.',
    },
    {
      title: 'Interactive profile',
      description:
        'The chatbot and design-pattern sections are still here for a more playful look at how I think, but the main path now focuses on hiring-relevant work.',
    },
  ],
  'If the work looks relevant, send me a message. I would rather show you good work than only describe it.',
];

export default aboutContentData;
